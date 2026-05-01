from fastapi import FastAPI, WebSocket

app = FastAPI()

connections = []

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    connections.append(websocket)

    while True:
        data = await websocket.receive_text()

        for connection in connections:
            await connection.send_text(data)