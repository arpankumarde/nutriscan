from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from Gemini import Llm_result
from textract import detect_file_text
from fastapi import FastAPI, File, Form, UploadFile, HTTPException
from typing import Optional


app = FastAPI()

# Configuring CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,  #frontend URL 
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def test():
    return {"message": "Hello World"}

# endpoint to extract ingredients from image
@app.post("/upload")
async def recommnedation(image: Optional[UploadFile] = File(None),
                        product_name: Optional[str] = Form(None),
                        ingredients_list: Optional[List[str]] = Form(None)):
    try:
        if image:
            ingredients = detect_file_text(image)

        # Extract ingredients from image
        elif product_name:
            #include agent to extract ingredients
            ingredients=product_name
        else:
            raise HTTPException(status_code=400, detail="No input provided. Please provide an image or a product name.")
        
        health_history = ','.join(ingredients_list)
        
        # Pass ingredients and health_history to the LLM
        result = Llm_result(ingredients, health_history)
        return {"response": result}

    except Exception as e:
        # Log the error
        print(f"An error occurred: {e}")
        # Return a 500 error with more details
        raise HTTPException(status_code=500, detail="Internal Server Error")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=10000)