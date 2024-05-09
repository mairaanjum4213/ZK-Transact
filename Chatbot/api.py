import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from langchain.llms import OpenAI
from langchain.chains import ConversationChain
from langchain.prompts.prompt import PromptTemplate
from langchain.memory import MongoDBChatMessageHistory, ConversationBufferMemory
from typing import Dict
from pydantic import BaseModel
from typing import Optional
from langchain_mongodb import MongoDBChatMessageHistory
import flask
from flask_cors import CORS

app = flask.Flask(__name__)
CORS(app)

class ChatInput(BaseModel):
    session: str
    input: str

# Setup MongoDB client
uri = "mongodb+srv://MAIRAANJUM:TsHWc53rx4vXw7VG@cluster0.o8qcwda.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Setup OpenAI
os.environ["OPENAI_API_KEY"] = "sk-proj-7Lv0uHPJj2CaBuX9Be83T3BlbkFJne3b2rF7A8n9pB93XfW9"
llm = OpenAI(temperature=0.5)

app = FastAPI(desc="Chatbot")

# CORS configuration
origins = [
    "http://localhost:5173",  # Update with the correct origin of your frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

_DEFAULT_TEMPLATE = """you are the chatbot that is prepared by whispering ai
This is the history about the user
{history} and this is the recent conversation
{input}
"""

@app.post("/chat")
def chatbot(data: Dict[str, str]):
    print("Received data:", data)
    input_text = data.get("input")
    session = data.get("session")

    if not input_text or not session:
        raise HTTPException(status_code=422, detail="Missing input or session in the request.")

    message_history = MongoDBChatMessageHistory(
        connection_string=uri, session_id=session
    )

    PROMPT = PromptTemplate(
        input_variables=["history", "input"],
        template=_DEFAULT_TEMPLATE,
    )
    memories = ConversationBufferMemory(k=3)  # type: ignore

    if len(message_history.messages):
        memories.save_context(
            {"input": message_history.messages[0].content},
            {"output": message_history.messages[1].content}  # type: ignore
        )
        conversation = ConversationChain(
            llm=llm,
            verbose=False,
            prompt=PROMPT,
            memory=memories
        )
        conv = conversation.predict(input=input_text)
        print("OpenAI Response:", conv)
        message_history.add_user_message(input_text)
        message_history.add_ai_message(conv)

        # Log intermediate values
        print(f"Input Text: {input_text}")
        print(f"Session ID: {session}")
        print(f"Chatbot Response: {conv}")

        return conv
    
    else:
        conversation = ConversationChain(
            llm=llm,
            verbose=False,
            prompt=PROMPT,
            memory=memories
        )
        conv = conversation.predict(input=input_text)
        print("OpenAI Response:", conv)
        message_history.add_user_message(input_text)
        message_history.add_ai_message(conv)

        # Log intermediate values
        print(f"Input Text: {input_text}")
        print(f"Session ID: {session}")
        print(f"Chatbot Response: {conv}")

        return conv
