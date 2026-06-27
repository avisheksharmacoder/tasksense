from fastapi import FastAPI
import uvicorn
from contextlib import asynccontextmanager
import logfire


logfire.configure()


@asynccontextmanager
async def custom_lifespan(app: FastAPI):
    logfire.info("starting app")
    yield
    logfire.info("shutting down app")


app = FastAPI(lifespan=custom_lifespan, debug=True)
logfire.instrument_fastapi(app)




if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)


