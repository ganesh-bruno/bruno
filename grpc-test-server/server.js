const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Load the protobuf definition
const PROTO_PATH = path.join(__dirname, 'hello.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

// Implementation of the gRPC service
const greeterService = {
  // Unary RPC
  sayHello: (call, callback) => {
    const { name, age, hobbies } = call.request;
    console.log(`Received unary request: name=${name}, age=${age}, hobbies=${hobbies}`);
    
    const response = {
      message: `Hello ${name}! You are ${age} years old.`,
      timestamp: new Date().toISOString(),
      response_code: 200
    };
    
    callback(null, response);
  },

  // Server streaming RPC
  sayHelloStream: (call) => {
    const { name, age, hobbies } = call.request;
    console.log(`Received streaming request: name=${name}, age=${age}, hobbies=${hobbies}`);
    
    // Send multiple responses
    for (let i = 1; i <= 5; i++) {
      const response = {
        message: `Hello ${name}! This is message ${i} of 5.`,
        timestamp: new Date().toISOString(),
        response_code: 200 + i
      };
      
      call.write(response);
      
      // Add a small delay between messages
      setTimeout(() => {}, 1000);
    }
    
    call.end();
  },

  // Client streaming RPC
  sayHelloClientStream: (call, callback) => {
    let messageCount = 0;
    let allNames = [];
    
    call.on('data', (request) => {
      messageCount++;
      allNames.push(request.name);
      console.log(`Received client stream message ${messageCount}: ${request.name}`);
    });
    
    call.on('end', () => {
      const response = {
        message: `Received ${messageCount} messages from: ${allNames.join(', ')}`,
        timestamp: new Date().toISOString(),
        response_code: 200
      };
      
      callback(null, response);
    });
  },

  // Bidirectional streaming RPC
  sayHelloBidiStream: (call) => {
    let messageCount = 0;
    
    call.on('data', (request) => {
      messageCount++;
      console.log(`Received bidi stream message ${messageCount}: ${request.name}`);
      
      // Send a response for each received message
      const response = {
        message: `Hello ${request.name}! This is response ${messageCount}.`,
        timestamp: new Date().toISOString(),
        response_code: 200 + messageCount
      };
      
      call.write(response);
    });
    
    call.on('end', () => {
      console.log(`Bidirectional stream ended. Total messages: ${messageCount}`);
      call.end();
    });
  }
};

// Create and start the gRPC server
const server = new grpc.Server();

server.addService(hello_proto.Greeter.service, greeterService);

const PORT = 50051;
const ADDRESS = `0.0.0.0:${PORT}`;

server.bindAsync(ADDRESS, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error('Failed to bind server:', err);
    return;
  }
  
  server.start();
  console.log(`🚀 gRPC Test Server running on ${ADDRESS}`);
  console.log('📋 Available services:');
  console.log('  - helloworld.Greeter.SayHello (Unary)');
  console.log('  - helloworld.Greeter.SayHelloStream (Server Streaming)');
  console.log('  - helloworld.Greeter.SayHelloClientStream (Client Streaming)');
  console.log('  - helloworld.Greeter.SayHelloBidiStream (Bidirectional Streaming)');
  console.log('\n💡 Test with Bruno using:');
  console.log(`   URL: localhost:${PORT}`);
  console.log('   Service: helloworld.Greeter');
  console.log('   Method: SayHello');
  console.log('\n📝 Sample request message:');
  console.log('   {');
  console.log('     "name": "John Doe",');
  console.log('     "age": 30,');
  console.log('     "hobbies": ["coding", "reading"]');
  console.log('   }');
}); 