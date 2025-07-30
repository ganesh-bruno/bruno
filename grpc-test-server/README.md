# gRPC Test Server for Bruno

A simple gRPC server for testing Bruno's gRPC functionality.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Test with Bruno:**
   - Open Bruno
   - Create a new gRPC request
   - Use URL: `localhost:50051`
   - Service: `helloworld.Greeter`
   - Method: `SayHello`

## Available Services

### 1. SayHello (Unary RPC)
- **Method**: `helloworld.Greeter.SayHello`
- **Type**: Unary (request-response)
- **Sample Request**:
  ```json
  {
    "name": "John Doe",
    "age": 30,
    "hobbies": ["coding", "reading"]
  }
  ```

### 2. SayHelloStream (Server Streaming)
- **Method**: `helloworld.Greeter.SayHelloStream`
- **Type**: Server streaming (one request, multiple responses)
- **Sample Request**: Same as above

### 3. SayHelloClientStream (Client Streaming)
- **Method**: `helloworld.Greeter.SayHelloClientStream`
- **Type**: Client streaming (multiple requests, one response)
- **Sample Request**: Multiple messages with the same structure

### 4. SayHelloBidiStream (Bidirectional Streaming)
- **Method**: `helloworld.Greeter.SayHelloBidiStream`
- **Type**: Bidirectional streaming (multiple requests, multiple responses)
- **Sample Request**: Multiple messages with the same structure

## Testing with Bruno

1. **Create a new gRPC request in Bruno**
2. **Configure the request:**
   - URL: `localhost:50051`
   - Service: `helloworld.Greeter`
   - Method: Choose from the available methods above
3. **Set the request message** (JSON format):
   ```json
   {
     "name": "Your Name",
     "age": 25,
     "hobbies": ["testing", "gRPC"]
   }
   ```
4. **Send the request** and observe the response

## Understanding gRPC

### What is gRPC?
gRPC is a high-performance, open-source RPC (Remote Procedure Call) framework that can run in any environment. It enables client and server applications to communicate transparently and develop connected systems.

### Key Concepts:
- **Protocol Buffers**: Used for defining service interfaces and message types
- **RPC Types**:
  - **Unary**: One request, one response
  - **Server Streaming**: One request, multiple responses
  - **Client Streaming**: Multiple requests, one response
  - **Bidirectional Streaming**: Multiple requests, multiple responses

### Why gRPC?
- **Performance**: Uses HTTP/2 for efficient communication
- **Type Safety**: Strong typing with Protocol Buffers
- **Code Generation**: Automatic client and server code generation
- **Streaming**: Built-in support for streaming data
- **Interoperability**: Works across different languages and platforms

## Troubleshooting

- **Port already in use**: Change the port in `server.js` (line 89)
- **Connection refused**: Make sure the server is running
- **Method not found**: Check the service and method names in Bruno 