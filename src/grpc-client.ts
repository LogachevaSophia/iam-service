import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { config } from './config';

const PROTO_PATH = path.join(__dirname, './proto/iam.proto');

let client: any;

export async function getIamGrpcClient() {
  if (client) return client;

  const packageDefinition = await protoLoader.load(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });
  
  const iamProto = grpc.loadPackageDefinition(packageDefinition) as any;
  const { IAMService } = iamProto.iam;

  client = new IAMService(
    `localhost:${config.server.port}`,
    grpc.credentials.createInsecure()
  );
  
  return client;
}