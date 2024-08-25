import os
import PyPDF2
import google.generativeai as genai
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
import uvicorn
import tempfile

app = FastAPI()

# Configure Gemini API
genai_api_key = os.environ.get('GENAI_API_KEY')
if not genai_api_key:
    raise ValueError("GENAI_API_KEY environment variable is not set")
genai.configure(api_key=genai_api_key)

# Initialize the sentence transformer model
model = SentenceTransformer('all-MiniLM-L6-v2')

def read_pdf(file_path):
    with open(file_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ''
        for page in reader.pages:
            text += page.extract_text()
    return text

def split_into_chunks(text, chunk_size=1000):
    return [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]

def encode_chunks(chunks):
    return model.encode(chunks)

def find_relevant_chunks(query, chunks, embeddings, top_k=3):
    query_embedding = model.encode([query])
    similarities = cosine_similarity(query_embedding, embeddings)[0]
    top_indices = np.argsort(similarities)[-top_k:]
    return [chunks[i] for i in top_indices]

def generate_answer(query, context):
    prompt = f"""
    Context: {context}

    Question: {query}

    Please provide a concise and accurate answer to the question based on the given context. 
    If the context doesn't contain enough information to answer the question, please state that.
    """
    
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(prompt)
    return response.text

def rag_pdf_qa(pdf_path, query):
    text = read_pdf(pdf_path)
    chunks = split_into_chunks(text)
    embeddings = encode_chunks(chunks)
    relevant_chunks = find_relevant_chunks(query, chunks, embeddings)
    context = " ".join(relevant_chunks)
    answer = generate_answer(query, context)
    return answer

@app.post("/rag_qa")
async def rag_qa_endpoint(file: UploadFile = File(...), query: str = Form(...)):
    try:
        # Save the uploaded file temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            temp_file.write(await file.read())
            temp_file_path = temp_file.name

        # Process the PDF and generate the answer
        answer = rag_pdf_qa(temp_file_path, query)

        # Remove the temporary file
        os.unlink(temp_file_path)

        return JSONResponse(content={"answer": answer})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=10000)