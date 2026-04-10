// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var iam_pb = require('./iam_pb.js');

function serialize_iam_AssignRoleRequest(arg) {
  if (!(arg instanceof iam_pb.AssignRoleRequest)) {
    throw new Error('Expected argument of type iam.AssignRoleRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_iam_AssignRoleRequest(buffer_arg) {
  return iam_pb.AssignRoleRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iam_AssignRoleResponse(arg) {
  if (!(arg instanceof iam_pb.AssignRoleResponse)) {
    throw new Error('Expected argument of type iam.AssignRoleResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_iam_AssignRoleResponse(buffer_arg) {
  return iam_pb.AssignRoleResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iam_BatchPermissionRequest(arg) {
  if (!(arg instanceof iam_pb.BatchPermissionRequest)) {
    throw new Error('Expected argument of type iam.BatchPermissionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_iam_BatchPermissionRequest(buffer_arg) {
  return iam_pb.BatchPermissionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iam_BatchPermissionResponse(arg) {
  if (!(arg instanceof iam_pb.BatchPermissionResponse)) {
    throw new Error('Expected argument of type iam.BatchPermissionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_iam_BatchPermissionResponse(buffer_arg) {
  return iam_pb.BatchPermissionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iam_CreatePermissionRequest(arg) {
  if (!(arg instanceof iam_pb.CreatePermissionRequest)) {
    throw new Error('Expected argument of type iam.CreatePermissionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_iam_CreatePermissionRequest(buffer_arg) {
  return iam_pb.CreatePermissionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iam_CreateRoleRequest(arg) {
  if (!(arg instanceof iam_pb.CreateRoleRequest)) {
    throw new Error('Expected argument of type iam.CreateRoleRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_iam_CreateRoleRequest(buffer_arg) {
  return iam_pb.CreateRoleRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iam_CreateUserRequest(arg) {
  if (!(arg instanceof iam_pb.CreateUserRequest)) {
    throw new Error('Expected argument of type iam.CreateUserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_iam_CreateUserRequest(buffer_arg) {
  return iam_pb.CreateUserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iam_DeleteRoleRequest(arg) {
  if (!(arg instanceof iam_pb.DeleteRoleRequest)) {
    throw new Error('Expected argument of type iam.DeleteRoleRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_iam_DeleteRoleRequest(buffer_arg) {
  return iam_pb.DeleteRoleRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iam_DeleteRoleResponse(arg) {
  if (!(arg instanceof iam_pb.DeleteRoleResponse)) {
    throw new Error('Expected argument of type iam.DeleteRoleResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_iam_DeleteRoleResponse(buffer_arg) {
  return iam_pb.DeleteRoleResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iam_DeleteUserRequest(arg) {
  if (!(arg instanceof iam_pb.DeleteUserRequest)) {
    throw new Error('Expected argument of type iam.DeleteUserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_iam_DeleteUserRequest(buffer_arg) {
  return iam_pb.DeleteUserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iam_DeleteUserResponse(arg) {
  if (!(arg instanceof iam_pb.DeleteUserResponse)) {
    throw new Error('Expected argument of type iam.DeleteUserResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_iam_DeleteUserResponse(buffer_arg) {
  return iam_pb.DeleteUserResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iam_GetRoleRequest(arg) {
  if (!(arg instanceof iam_pb.GetRoleRequest)) {
    throw new Error('Expected argument of type iam.GetRoleRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_iam_GetRoleRequest(buffer_arg) {
  return iam_pb.GetRoleRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iam_GetUserRequest(arg) {
  if (!(arg instanceof iam_pb.GetUserRequest)) {
    throw new Error('Expected argument of type iam.GetUserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_iam_GetUserRequest(buffer_arg) {
  return iam_pb.GetUserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iam_GetUserRolesRequest(arg) {
  if (!(arg instanceof iam_pb.GetUserRolesRequest)) {
    throw new Error('Expected argument of type iam.GetUserRolesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_iam_GetUserRolesRequest(buffer_arg) {
  return iam_pb.GetUserRolesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iam_GetUserRolesResponse(arg) {
  if (!(arg instanceof iam_pb.GetUserRolesResponse)) {
    throw new Error('Expected argument of type iam.GetUserRolesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_iam_GetUserRolesResponse(buffer_arg) {
  return iam_pb.GetUserRolesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iam_ListPermissionsRequest(arg) {
  if (!(arg instanceof iam_pb.ListPermissionsRequest)) {
    throw new Error('Expected argument of type iam.ListPermissionsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_iam_ListPermissionsRequest(buffer_arg) {
  return iam_pb.ListPermissionsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iam_ListPermissionsResponse(arg) {
  if (!(arg instanceof iam_pb.ListPermissionsResponse)) {
    throw new Error('Expected argument of type iam.ListPermissionsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_iam_ListPermissionsResponse(buffer_arg) {
  return iam_pb.ListPermissionsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iam_ListRolesRequest(arg) {
  if (!(arg instanceof iam_pb.ListRolesRequest)) {
    throw new Error('Expected argument of type iam.ListRolesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_iam_ListRolesRequest(buffer_arg) {
  return iam_pb.ListRolesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iam_ListRolesResponse(arg) {
  if (!(arg instanceof iam_pb.ListRolesResponse)) {
    throw new Error('Expected argument of type iam.ListRolesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_iam_ListRolesResponse(buffer_arg) {
  return iam_pb.ListRolesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iam_ListUsersRequest(arg) {
  if (!(arg instanceof iam_pb.ListUsersRequest)) {
    throw new Error('Expected argument of type iam.ListUsersRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_iam_ListUsersRequest(buffer_arg) {
  return iam_pb.ListUsersRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iam_ListUsersResponse(arg) {
  if (!(arg instanceof iam_pb.ListUsersResponse)) {
    throw new Error('Expected argument of type iam.ListUsersResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_iam_ListUsersResponse(buffer_arg) {
  return iam_pb.ListUsersResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iam_LoginRequest(arg) {
  if (!(arg instanceof iam_pb.LoginRequest)) {
    throw new Error('Expected argument of type iam.LoginRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_iam_LoginRequest(buffer_arg) {
  return iam_pb.LoginRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iam_LoginResponse(arg) {
  if (!(arg instanceof iam_pb.LoginResponse)) {
    throw new Error('Expected argument of type iam.LoginResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_iam_LoginResponse(buffer_arg) {
  return iam_pb.LoginResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iam_LogoutRequest(arg) {
  if (!(arg instanceof iam_pb.LogoutRequest)) {
    throw new Error('Expected argument of type iam.LogoutRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_iam_LogoutRequest(buffer_arg) {
  return iam_pb.LogoutRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iam_LogoutResponse(arg) {
  if (!(arg instanceof iam_pb.LogoutResponse)) {
    throw new Error('Expected argument of type iam.LogoutResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_iam_LogoutResponse(buffer_arg) {
  return iam_pb.LogoutResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iam_Permission(arg) {
  if (!(arg instanceof iam_pb.Permission)) {
    throw new Error('Expected argument of type iam.Permission');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_iam_Permission(buffer_arg) {
  return iam_pb.Permission.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iam_PermissionRequest(arg) {
  if (!(arg instanceof iam_pb.PermissionRequest)) {
    throw new Error('Expected argument of type iam.PermissionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_iam_PermissionRequest(buffer_arg) {
  return iam_pb.PermissionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iam_PermissionResponse(arg) {
  if (!(arg instanceof iam_pb.PermissionResponse)) {
    throw new Error('Expected argument of type iam.PermissionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_iam_PermissionResponse(buffer_arg) {
  return iam_pb.PermissionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iam_RefreshTokenRequest(arg) {
  if (!(arg instanceof iam_pb.RefreshTokenRequest)) {
    throw new Error('Expected argument of type iam.RefreshTokenRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_iam_RefreshTokenRequest(buffer_arg) {
  return iam_pb.RefreshTokenRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iam_RevokeRoleRequest(arg) {
  if (!(arg instanceof iam_pb.RevokeRoleRequest)) {
    throw new Error('Expected argument of type iam.RevokeRoleRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_iam_RevokeRoleRequest(buffer_arg) {
  return iam_pb.RevokeRoleRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iam_RevokeRoleResponse(arg) {
  if (!(arg instanceof iam_pb.RevokeRoleResponse)) {
    throw new Error('Expected argument of type iam.RevokeRoleResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_iam_RevokeRoleResponse(buffer_arg) {
  return iam_pb.RevokeRoleResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iam_RoleResponse(arg) {
  if (!(arg instanceof iam_pb.RoleResponse)) {
    throw new Error('Expected argument of type iam.RoleResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_iam_RoleResponse(buffer_arg) {
  return iam_pb.RoleResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iam_UpdateRoleRequest(arg) {
  if (!(arg instanceof iam_pb.UpdateRoleRequest)) {
    throw new Error('Expected argument of type iam.UpdateRoleRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_iam_UpdateRoleRequest(buffer_arg) {
  return iam_pb.UpdateRoleRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iam_UpdateUserRequest(arg) {
  if (!(arg instanceof iam_pb.UpdateUserRequest)) {
    throw new Error('Expected argument of type iam.UpdateUserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_iam_UpdateUserRequest(buffer_arg) {
  return iam_pb.UpdateUserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iam_UserResponse(arg) {
  if (!(arg instanceof iam_pb.UserResponse)) {
    throw new Error('Expected argument of type iam.UserResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_iam_UserResponse(buffer_arg) {
  return iam_pb.UserResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iam_ValidateTokenRequest(arg) {
  if (!(arg instanceof iam_pb.ValidateTokenRequest)) {
    throw new Error('Expected argument of type iam.ValidateTokenRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_iam_ValidateTokenRequest(buffer_arg) {
  return iam_pb.ValidateTokenRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_iam_ValidateTokenResponse(arg) {
  if (!(arg instanceof iam_pb.ValidateTokenResponse)) {
    throw new Error('Expected argument of type iam.ValidateTokenResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_iam_ValidateTokenResponse(buffer_arg) {
  return iam_pb.ValidateTokenResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var IAMServiceService = exports.IAMServiceService = {
  // Проверка одного разрешения
checkPermission: {
    path: '/iam.IAMService/CheckPermission',
    requestStream: false,
    responseStream: false,
    requestType: iam_pb.PermissionRequest,
    responseType: iam_pb.PermissionResponse,
    requestSerialize: serialize_iam_PermissionRequest,
    requestDeserialize: deserialize_iam_PermissionRequest,
    responseSerialize: serialize_iam_PermissionResponse,
    responseDeserialize: deserialize_iam_PermissionResponse,
  },
  // Проверка нескольких разрешений
batchCheck: {
    path: '/iam.IAMService/BatchCheck',
    requestStream: false,
    responseStream: false,
    requestType: iam_pb.BatchPermissionRequest,
    responseType: iam_pb.BatchPermissionResponse,
    requestSerialize: serialize_iam_BatchPermissionRequest,
    requestDeserialize: deserialize_iam_BatchPermissionRequest,
    responseSerialize: serialize_iam_BatchPermissionResponse,
    responseDeserialize: deserialize_iam_BatchPermissionResponse,
  },
  // Управление пользователями
createUser: {
    path: '/iam.IAMService/CreateUser',
    requestStream: false,
    responseStream: false,
    requestType: iam_pb.CreateUserRequest,
    responseType: iam_pb.UserResponse,
    requestSerialize: serialize_iam_CreateUserRequest,
    requestDeserialize: deserialize_iam_CreateUserRequest,
    responseSerialize: serialize_iam_UserResponse,
    responseDeserialize: deserialize_iam_UserResponse,
  },
  getUser: {
    path: '/iam.IAMService/GetUser',
    requestStream: false,
    responseStream: false,
    requestType: iam_pb.GetUserRequest,
    responseType: iam_pb.UserResponse,
    requestSerialize: serialize_iam_GetUserRequest,
    requestDeserialize: deserialize_iam_GetUserRequest,
    responseSerialize: serialize_iam_UserResponse,
    responseDeserialize: deserialize_iam_UserResponse,
  },
  updateUser: {
    path: '/iam.IAMService/UpdateUser',
    requestStream: false,
    responseStream: false,
    requestType: iam_pb.UpdateUserRequest,
    responseType: iam_pb.UserResponse,
    requestSerialize: serialize_iam_UpdateUserRequest,
    requestDeserialize: deserialize_iam_UpdateUserRequest,
    responseSerialize: serialize_iam_UserResponse,
    responseDeserialize: deserialize_iam_UserResponse,
  },
  deleteUser: {
    path: '/iam.IAMService/DeleteUser',
    requestStream: false,
    responseStream: false,
    requestType: iam_pb.DeleteUserRequest,
    responseType: iam_pb.DeleteUserResponse,
    requestSerialize: serialize_iam_DeleteUserRequest,
    requestDeserialize: deserialize_iam_DeleteUserRequest,
    responseSerialize: serialize_iam_DeleteUserResponse,
    responseDeserialize: deserialize_iam_DeleteUserResponse,
  },
  listUsers: {
    path: '/iam.IAMService/ListUsers',
    requestStream: false,
    responseStream: false,
    requestType: iam_pb.ListUsersRequest,
    responseType: iam_pb.ListUsersResponse,
    requestSerialize: serialize_iam_ListUsersRequest,
    requestDeserialize: deserialize_iam_ListUsersRequest,
    responseSerialize: serialize_iam_ListUsersResponse,
    responseDeserialize: deserialize_iam_ListUsersResponse,
  },
  // Управление ролями
createRole: {
    path: '/iam.IAMService/CreateRole',
    requestStream: false,
    responseStream: false,
    requestType: iam_pb.CreateRoleRequest,
    responseType: iam_pb.RoleResponse,
    requestSerialize: serialize_iam_CreateRoleRequest,
    requestDeserialize: deserialize_iam_CreateRoleRequest,
    responseSerialize: serialize_iam_RoleResponse,
    responseDeserialize: deserialize_iam_RoleResponse,
  },
  getRole: {
    path: '/iam.IAMService/GetRole',
    requestStream: false,
    responseStream: false,
    requestType: iam_pb.GetRoleRequest,
    responseType: iam_pb.RoleResponse,
    requestSerialize: serialize_iam_GetRoleRequest,
    requestDeserialize: deserialize_iam_GetRoleRequest,
    responseSerialize: serialize_iam_RoleResponse,
    responseDeserialize: deserialize_iam_RoleResponse,
  },
  updateRole: {
    path: '/iam.IAMService/UpdateRole',
    requestStream: false,
    responseStream: false,
    requestType: iam_pb.UpdateRoleRequest,
    responseType: iam_pb.RoleResponse,
    requestSerialize: serialize_iam_UpdateRoleRequest,
    requestDeserialize: deserialize_iam_UpdateRoleRequest,
    responseSerialize: serialize_iam_RoleResponse,
    responseDeserialize: deserialize_iam_RoleResponse,
  },
  deleteRole: {
    path: '/iam.IAMService/DeleteRole',
    requestStream: false,
    responseStream: false,
    requestType: iam_pb.DeleteRoleRequest,
    responseType: iam_pb.DeleteRoleResponse,
    requestSerialize: serialize_iam_DeleteRoleRequest,
    requestDeserialize: deserialize_iam_DeleteRoleRequest,
    responseSerialize: serialize_iam_DeleteRoleResponse,
    responseDeserialize: deserialize_iam_DeleteRoleResponse,
  },
  listRoles: {
    path: '/iam.IAMService/ListRoles',
    requestStream: false,
    responseStream: false,
    requestType: iam_pb.ListRolesRequest,
    responseType: iam_pb.ListRolesResponse,
    requestSerialize: serialize_iam_ListRolesRequest,
    requestDeserialize: deserialize_iam_ListRolesRequest,
    responseSerialize: serialize_iam_ListRolesResponse,
    responseDeserialize: deserialize_iam_ListRolesResponse,
  },
  // Назначение ролей
assignRole: {
    path: '/iam.IAMService/AssignRole',
    requestStream: false,
    responseStream: false,
    requestType: iam_pb.AssignRoleRequest,
    responseType: iam_pb.AssignRoleResponse,
    requestSerialize: serialize_iam_AssignRoleRequest,
    requestDeserialize: deserialize_iam_AssignRoleRequest,
    responseSerialize: serialize_iam_AssignRoleResponse,
    responseDeserialize: deserialize_iam_AssignRoleResponse,
  },
  revokeRole: {
    path: '/iam.IAMService/RevokeRole',
    requestStream: false,
    responseStream: false,
    requestType: iam_pb.RevokeRoleRequest,
    responseType: iam_pb.RevokeRoleResponse,
    requestSerialize: serialize_iam_RevokeRoleRequest,
    requestDeserialize: deserialize_iam_RevokeRoleRequest,
    responseSerialize: serialize_iam_RevokeRoleResponse,
    responseDeserialize: deserialize_iam_RevokeRoleResponse,
  },
  getUserRoles: {
    path: '/iam.IAMService/GetUserRoles',
    requestStream: false,
    responseStream: false,
    requestType: iam_pb.GetUserRolesRequest,
    responseType: iam_pb.GetUserRolesResponse,
    requestSerialize: serialize_iam_GetUserRolesRequest,
    requestDeserialize: deserialize_iam_GetUserRolesRequest,
    responseSerialize: serialize_iam_GetUserRolesResponse,
    responseDeserialize: deserialize_iam_GetUserRolesResponse,
  },
  // Управление пермишенами
createPermission: {
    path: '/iam.IAMService/CreatePermission',
    requestStream: false,
    responseStream: false,
    requestType: iam_pb.CreatePermissionRequest,
    responseType: iam_pb.Permission,
    requestSerialize: serialize_iam_CreatePermissionRequest,
    requestDeserialize: deserialize_iam_CreatePermissionRequest,
    responseSerialize: serialize_iam_Permission,
    responseDeserialize: deserialize_iam_Permission,
  },
  listPermissions: {
    path: '/iam.IAMService/ListPermissions',
    requestStream: false,
    responseStream: false,
    requestType: iam_pb.ListPermissionsRequest,
    responseType: iam_pb.ListPermissionsResponse,
    requestSerialize: serialize_iam_ListPermissionsRequest,
    requestDeserialize: deserialize_iam_ListPermissionsRequest,
    responseSerialize: serialize_iam_ListPermissionsResponse,
    responseDeserialize: deserialize_iam_ListPermissionsResponse,
  },
  // Аутентификация
login: {
    path: '/iam.IAMService/Login',
    requestStream: false,
    responseStream: false,
    requestType: iam_pb.LoginRequest,
    responseType: iam_pb.LoginResponse,
    requestSerialize: serialize_iam_LoginRequest,
    requestDeserialize: deserialize_iam_LoginRequest,
    responseSerialize: serialize_iam_LoginResponse,
    responseDeserialize: deserialize_iam_LoginResponse,
  },
  logout: {
    path: '/iam.IAMService/Logout',
    requestStream: false,
    responseStream: false,
    requestType: iam_pb.LogoutRequest,
    responseType: iam_pb.LogoutResponse,
    requestSerialize: serialize_iam_LogoutRequest,
    requestDeserialize: deserialize_iam_LogoutRequest,
    responseSerialize: serialize_iam_LogoutResponse,
    responseDeserialize: deserialize_iam_LogoutResponse,
  },
  refreshToken: {
    path: '/iam.IAMService/RefreshToken',
    requestStream: false,
    responseStream: false,
    requestType: iam_pb.RefreshTokenRequest,
    responseType: iam_pb.LoginResponse,
    requestSerialize: serialize_iam_RefreshTokenRequest,
    requestDeserialize: deserialize_iam_RefreshTokenRequest,
    responseSerialize: serialize_iam_LoginResponse,
    responseDeserialize: deserialize_iam_LoginResponse,
  },
  validateToken: {
    path: '/iam.IAMService/ValidateToken',
    requestStream: false,
    responseStream: false,
    requestType: iam_pb.ValidateTokenRequest,
    responseType: iam_pb.ValidateTokenResponse,
    requestSerialize: serialize_iam_ValidateTokenRequest,
    requestDeserialize: deserialize_iam_ValidateTokenRequest,
    responseSerialize: serialize_iam_ValidateTokenResponse,
    responseDeserialize: deserialize_iam_ValidateTokenResponse,
  },
};

exports.IAMServiceClient = grpc.makeGenericClientConstructor(IAMServiceService, 'IAMService');
