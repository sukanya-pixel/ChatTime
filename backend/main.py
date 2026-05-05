from fastapi import FastAPI, WebSocket, WebSocketDisconnect

app = FastAPI()

@app.get("/")
def home():
    return {"status": "Chat API running"}

connections = set()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    connections.add(websocket)

    try:
        while True:
            data = await websocket.receive_text()
            for connection in connections:
                await connection.send_text(data)
    except WebSocketDisconnect:
        connections.remove(websocket)