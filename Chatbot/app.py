from langchain.document_loaders import DirectoryLoader
from langchain.llms import OpenAI
from langchain.chains import ConversationChain
import os
from langchain.memory import ConversationBufferMemory
from typing import List,Dict, Any
from langchain.prompts.prompt import PromptTemplate
from langchain_mongodb import MongoDBChatMessageHistory
from fastapi import FastAPI

## setup a mongodb client
uri = "mongodb+srv://MAIRAANJUM:TsHWc53rx4vXw7VG@cluster0.o8qcwda.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
##connect mongodb client to langchain
message_history = MongoDBChatMessageHistory(
        connection_string=uri, session_id= "abc"
    )
##setup buffermemory 
memories = ConversationBufferMemory(k=3) # type: ignore
##add message history from mongodb to buffermemory
PROMPT = PromptTemplate(
    input_variables=["history", "input"],
    template="Your prompt template goes here",
)

##connect llm, buffermemory to langchain
os.environ["OPENAI_API_KEY"] = "sk-proj-7Lv0uHPJj2CaBuX9Be83T3BlbkFJne3b2rF7A8n9pB93XfW9"
llm = OpenAI(temperature=0.5)
conversation = ConversationChain(
                                llm=llm,
                                verbose=False,
                                prompt = PROMPT,
                                memory=memories 
                                )
## get the result
conv = conversation.predict(input="What is your name?", link="abc")
