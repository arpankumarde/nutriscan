import os
import google.generativeai as genai


def create_prompt(ingredients, health_history):
    prompt = f"""
    Given the following ingredients and the user's health history, determine if the product is suitable for the user.
    If a product name is given find the ingredients of the product and then compare
    Ingredients: {ingredients}

    Health History: {health_history}

    Please respond with:
    1. Whether the user should buy the product or not.
    2. If the user should not buy the product, explain why by identifying any problematic ingredients and their potential effects on the user's health.
    3.Give it in 3-4 bullet points
    4.Tone: Formal .It should seem like you are talking directly to the user

    Note: If the user's query goes beyond the context of ingredients and health history, respond with "This question is beyond the context of the provided information. Please provide ingredient information and health history for an appropriate response."
    """
    return prompt

def Llm_result(ingredients,health_history):
    
    genai.configure(api_key=os.getenv('GENAI_API_KEY'))
    model = genai.GenerativeModel('gemini-1.5-flash')

    prompt = create_prompt(ingredients, health_history)
    response = model.generate_content(prompt)

    return response.text


