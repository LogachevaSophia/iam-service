// package: iam
// file: iam.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as iam_pb from "./iam_pb";

interface IIAMServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    checkPermission: IIAMServiceService_ICheckPermission;
    batchCheck: IIAMServiceService_IBatchCheck;
    createUser: IIAMServiceService_ICreateUser;
    getUser: IIAMServiceService_IGetUser;
    updateUser: IIAMServiceService_IUpdateUser;
    deleteUser: IIAMServiceService_IDeleteUser;
    listUsers: IIAMServiceService_IListUsers;
    createRole: IIAMServiceService_ICreateRole;
    getRole: IIAMServiceService_IGetRole;
    updateRole: IIAMServiceService_IUpdateRole;
    deleteRole: IIAMServiceService_IDeleteRole;
    listRoles: IIAMServiceService_IListRoles;
    assignRole: IIAMServiceService_IAssignRole;
    revokeRole: IIAMServiceService_IRevokeRole;
    getUserRoles: IIAMServiceService_IGetUserRoles;
    createPermission: IIAMServiceService_ICreatePermission;
    listPermissions: IIAMServiceService_IListPermissions;
    login: IIAMServiceService_ILogin;
    logout: IIAMServiceService_ILogout;
    refreshToken: IIAMServiceService_IRefreshToken;
    validateToken: IIAMServiceService_IValidateToken;
}

interface IIAMServiceService_ICheckPermission extends grpc.MethodDefinition<iam_pb.PermissionRequest, iam_pb.PermissionResponse> {
    path: "/iam.IAMService/CheckPermission";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<iam_pb.PermissionRequest>;
    requestDeserialize: grpc.deserialize<iam_pb.PermissionRequest>;
    responseSerialize: grpc.serialize<iam_pb.PermissionResponse>;
    responseDeserialize: grpc.deserialize<iam_pb.PermissionResponse>;
}
interface IIAMServiceService_IBatchCheck extends grpc.MethodDefinition<iam_pb.BatchPermissionRequest, iam_pb.BatchPermissionResponse> {
    path: "/iam.IAMService/BatchCheck";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<iam_pb.BatchPermissionRequest>;
    requestDeserialize: grpc.deserialize<iam_pb.BatchPermissionRequest>;
    responseSerialize: grpc.serialize<iam_pb.BatchPermissionResponse>;
    responseDeserialize: grpc.deserialize<iam_pb.BatchPermissionResponse>;
}
interface IIAMServiceService_ICreateUser extends grpc.MethodDefinition<iam_pb.CreateUserRequest, iam_pb.UserResponse> {
    path: "/iam.IAMService/CreateUser";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<iam_pb.CreateUserRequest>;
    requestDeserialize: grpc.deserialize<iam_pb.CreateUserRequest>;
    responseSerialize: grpc.serialize<iam_pb.UserResponse>;
    responseDeserialize: grpc.deserialize<iam_pb.UserResponse>;
}
interface IIAMServiceService_IGetUser extends grpc.MethodDefinition<iam_pb.GetUserRequest, iam_pb.UserResponse> {
    path: "/iam.IAMService/GetUser";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<iam_pb.GetUserRequest>;
    requestDeserialize: grpc.deserialize<iam_pb.GetUserRequest>;
    responseSerialize: grpc.serialize<iam_pb.UserResponse>;
    responseDeserialize: grpc.deserialize<iam_pb.UserResponse>;
}
interface IIAMServiceService_IUpdateUser extends grpc.MethodDefinition<iam_pb.UpdateUserRequest, iam_pb.UserResponse> {
    path: "/iam.IAMService/UpdateUser";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<iam_pb.UpdateUserRequest>;
    requestDeserialize: grpc.deserialize<iam_pb.UpdateUserRequest>;
    responseSerialize: grpc.serialize<iam_pb.UserResponse>;
    responseDeserialize: grpc.deserialize<iam_pb.UserResponse>;
}
interface IIAMServiceService_IDeleteUser extends grpc.MethodDefinition<iam_pb.DeleteUserRequest, iam_pb.DeleteUserResponse> {
    path: "/iam.IAMService/DeleteUser";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<iam_pb.DeleteUserRequest>;
    requestDeserialize: grpc.deserialize<iam_pb.DeleteUserRequest>;
    responseSerialize: grpc.serialize<iam_pb.DeleteUserResponse>;
    responseDeserialize: grpc.deserialize<iam_pb.DeleteUserResponse>;
}
interface IIAMServiceService_IListUsers extends grpc.MethodDefinition<iam_pb.ListUsersRequest, iam_pb.ListUsersResponse> {
    path: "/iam.IAMService/ListUsers";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<iam_pb.ListUsersRequest>;
    requestDeserialize: grpc.deserialize<iam_pb.ListUsersRequest>;
    responseSerialize: grpc.serialize<iam_pb.ListUsersResponse>;
    responseDeserialize: grpc.deserialize<iam_pb.ListUsersResponse>;
}
interface IIAMServiceService_ICreateRole extends grpc.MethodDefinition<iam_pb.CreateRoleRequest, iam_pb.RoleResponse> {
    path: "/iam.IAMService/CreateRole";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<iam_pb.CreateRoleRequest>;
    requestDeserialize: grpc.deserialize<iam_pb.CreateRoleRequest>;
    responseSerialize: grpc.serialize<iam_pb.RoleResponse>;
    responseDeserialize: grpc.deserialize<iam_pb.RoleResponse>;
}
interface IIAMServiceService_IGetRole extends grpc.MethodDefinition<iam_pb.GetRoleRequest, iam_pb.RoleResponse> {
    path: "/iam.IAMService/GetRole";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<iam_pb.GetRoleRequest>;
    requestDeserialize: grpc.deserialize<iam_pb.GetRoleRequest>;
    responseSerialize: grpc.serialize<iam_pb.RoleResponse>;
    responseDeserialize: grpc.deserialize<iam_pb.RoleResponse>;
}
interface IIAMServiceService_IUpdateRole extends grpc.MethodDefinition<iam_pb.UpdateRoleRequest, iam_pb.RoleResponse> {
    path: "/iam.IAMService/UpdateRole";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<iam_pb.UpdateRoleRequest>;
    requestDeserialize: grpc.deserialize<iam_pb.UpdateRoleRequest>;
    responseSerialize: grpc.serialize<iam_pb.RoleResponse>;
    responseDeserialize: grpc.deserialize<iam_pb.RoleResponse>;
}
interface IIAMServiceService_IDeleteRole extends grpc.MethodDefinition<iam_pb.DeleteRoleRequest, iam_pb.DeleteRoleResponse> {
    path: "/iam.IAMService/DeleteRole";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<iam_pb.DeleteRoleRequest>;
    requestDeserialize: grpc.deserialize<iam_pb.DeleteRoleRequest>;
    responseSerialize: grpc.serialize<iam_pb.DeleteRoleResponse>;
    responseDeserialize: grpc.deserialize<iam_pb.DeleteRoleResponse>;
}
interface IIAMServiceService_IListRoles extends grpc.MethodDefinition<iam_pb.ListRolesRequest, iam_pb.ListRolesResponse> {
    path: "/iam.IAMService/ListRoles";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<iam_pb.ListRolesRequest>;
    requestDeserialize: grpc.deserialize<iam_pb.ListRolesRequest>;
    responseSerialize: grpc.serialize<iam_pb.ListRolesResponse>;
    responseDeserialize: grpc.deserialize<iam_pb.ListRolesResponse>;
}
interface IIAMServiceService_IAssignRole extends grpc.MethodDefinition<iam_pb.AssignRoleRequest, iam_pb.AssignRoleResponse> {
    path: "/iam.IAMService/AssignRole";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<iam_pb.AssignRoleRequest>;
    requestDeserialize: grpc.deserialize<iam_pb.AssignRoleRequest>;
    responseSerialize: grpc.serialize<iam_pb.AssignRoleResponse>;
    responseDeserialize: grpc.deserialize<iam_pb.AssignRoleResponse>;
}
interface IIAMServiceService_IRevokeRole extends grpc.MethodDefinition<iam_pb.RevokeRoleRequest, iam_pb.RevokeRoleResponse> {
    path: "/iam.IAMService/RevokeRole";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<iam_pb.RevokeRoleRequest>;
    requestDeserialize: grpc.deserialize<iam_pb.RevokeRoleRequest>;
    responseSerialize: grpc.serialize<iam_pb.RevokeRoleResponse>;
    responseDeserialize: grpc.deserialize<iam_pb.RevokeRoleResponse>;
}
interface IIAMServiceService_IGetUserRoles extends grpc.MethodDefinition<iam_pb.GetUserRolesRequest, iam_pb.GetUserRolesResponse> {
    path: "/iam.IAMService/GetUserRoles";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<iam_pb.GetUserRolesRequest>;
    requestDeserialize: grpc.deserialize<iam_pb.GetUserRolesRequest>;
    responseSerialize: grpc.serialize<iam_pb.GetUserRolesResponse>;
    responseDeserialize: grpc.deserialize<iam_pb.GetUserRolesResponse>;
}
interface IIAMServiceService_ICreatePermission extends grpc.MethodDefinition<iam_pb.CreatePermissionRequest, iam_pb.Permission> {
    path: "/iam.IAMService/CreatePermission";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<iam_pb.CreatePermissionRequest>;
    requestDeserialize: grpc.deserialize<iam_pb.CreatePermissionRequest>;
    responseSerialize: grpc.serialize<iam_pb.Permission>;
    responseDeserialize: grpc.deserialize<iam_pb.Permission>;
}
interface IIAMServiceService_IListPermissions extends grpc.MethodDefinition<iam_pb.ListPermissionsRequest, iam_pb.ListPermissionsResponse> {
    path: "/iam.IAMService/ListPermissions";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<iam_pb.ListPermissionsRequest>;
    requestDeserialize: grpc.deserialize<iam_pb.ListPermissionsRequest>;
    responseSerialize: grpc.serialize<iam_pb.ListPermissionsResponse>;
    responseDeserialize: grpc.deserialize<iam_pb.ListPermissionsResponse>;
}
interface IIAMServiceService_ILogin extends grpc.MethodDefinition<iam_pb.LoginRequest, iam_pb.LoginResponse> {
    path: "/iam.IAMService/Login";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<iam_pb.LoginRequest>;
    requestDeserialize: grpc.deserialize<iam_pb.LoginRequest>;
    responseSerialize: grpc.serialize<iam_pb.LoginResponse>;
    responseDeserialize: grpc.deserialize<iam_pb.LoginResponse>;
}
interface IIAMServiceService_ILogout extends grpc.MethodDefinition<iam_pb.LogoutRequest, iam_pb.LogoutResponse> {
    path: "/iam.IAMService/Logout";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<iam_pb.LogoutRequest>;
    requestDeserialize: grpc.deserialize<iam_pb.LogoutRequest>;
    responseSerialize: grpc.serialize<iam_pb.LogoutResponse>;
    responseDeserialize: grpc.deserialize<iam_pb.LogoutResponse>;
}
interface IIAMServiceService_IRefreshToken extends grpc.MethodDefinition<iam_pb.RefreshTokenRequest, iam_pb.LoginResponse> {
    path: "/iam.IAMService/RefreshToken";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<iam_pb.RefreshTokenRequest>;
    requestDeserialize: grpc.deserialize<iam_pb.RefreshTokenRequest>;
    responseSerialize: grpc.serialize<iam_pb.LoginResponse>;
    responseDeserialize: grpc.deserialize<iam_pb.LoginResponse>;
}
interface IIAMServiceService_IValidateToken extends grpc.MethodDefinition<iam_pb.ValidateTokenRequest, iam_pb.ValidateTokenResponse> {
    path: "/iam.IAMService/ValidateToken";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<iam_pb.ValidateTokenRequest>;
    requestDeserialize: grpc.deserialize<iam_pb.ValidateTokenRequest>;
    responseSerialize: grpc.serialize<iam_pb.ValidateTokenResponse>;
    responseDeserialize: grpc.deserialize<iam_pb.ValidateTokenResponse>;
}

export const IAMServiceService: IIAMServiceService;

export interface IIAMServiceServer {
    checkPermission: grpc.handleUnaryCall<iam_pb.PermissionRequest, iam_pb.PermissionResponse>;
    batchCheck: grpc.handleUnaryCall<iam_pb.BatchPermissionRequest, iam_pb.BatchPermissionResponse>;
    createUser: grpc.handleUnaryCall<iam_pb.CreateUserRequest, iam_pb.UserResponse>;
    getUser: grpc.handleUnaryCall<iam_pb.GetUserRequest, iam_pb.UserResponse>;
    updateUser: grpc.handleUnaryCall<iam_pb.UpdateUserRequest, iam_pb.UserResponse>;
    deleteUser: grpc.handleUnaryCall<iam_pb.DeleteUserRequest, iam_pb.DeleteUserResponse>;
    listUsers: grpc.handleUnaryCall<iam_pb.ListUsersRequest, iam_pb.ListUsersResponse>;
    createRole: grpc.handleUnaryCall<iam_pb.CreateRoleRequest, iam_pb.RoleResponse>;
    getRole: grpc.handleUnaryCall<iam_pb.GetRoleRequest, iam_pb.RoleResponse>;
    updateRole: grpc.handleUnaryCall<iam_pb.UpdateRoleRequest, iam_pb.RoleResponse>;
    deleteRole: grpc.handleUnaryCall<iam_pb.DeleteRoleRequest, iam_pb.DeleteRoleResponse>;
    listRoles: grpc.handleUnaryCall<iam_pb.ListRolesRequest, iam_pb.ListRolesResponse>;
    assignRole: grpc.handleUnaryCall<iam_pb.AssignRoleRequest, iam_pb.AssignRoleResponse>;
    revokeRole: grpc.handleUnaryCall<iam_pb.RevokeRoleRequest, iam_pb.RevokeRoleResponse>;
    getUserRoles: grpc.handleUnaryCall<iam_pb.GetUserRolesRequest, iam_pb.GetUserRolesResponse>;
    createPermission: grpc.handleUnaryCall<iam_pb.CreatePermissionRequest, iam_pb.Permission>;
    listPermissions: grpc.handleUnaryCall<iam_pb.ListPermissionsRequest, iam_pb.ListPermissionsResponse>;
    login: grpc.handleUnaryCall<iam_pb.LoginRequest, iam_pb.LoginResponse>;
    logout: grpc.handleUnaryCall<iam_pb.LogoutRequest, iam_pb.LogoutResponse>;
    refreshToken: grpc.handleUnaryCall<iam_pb.RefreshTokenRequest, iam_pb.LoginResponse>;
    validateToken: grpc.handleUnaryCall<iam_pb.ValidateTokenRequest, iam_pb.ValidateTokenResponse>;
}

export interface IIAMServiceClient {
    checkPermission(request: iam_pb.PermissionRequest, callback: (error: grpc.ServiceError | null, response: iam_pb.PermissionResponse) => void): grpc.ClientUnaryCall;
    checkPermission(request: iam_pb.PermissionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iam_pb.PermissionResponse) => void): grpc.ClientUnaryCall;
    checkPermission(request: iam_pb.PermissionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iam_pb.PermissionResponse) => void): grpc.ClientUnaryCall;
    batchCheck(request: iam_pb.BatchPermissionRequest, callback: (error: grpc.ServiceError | null, response: iam_pb.BatchPermissionResponse) => void): grpc.ClientUnaryCall;
    batchCheck(request: iam_pb.BatchPermissionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iam_pb.BatchPermissionResponse) => void): grpc.ClientUnaryCall;
    batchCheck(request: iam_pb.BatchPermissionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iam_pb.BatchPermissionResponse) => void): grpc.ClientUnaryCall;
    createUser(request: iam_pb.CreateUserRequest, callback: (error: grpc.ServiceError | null, response: iam_pb.UserResponse) => void): grpc.ClientUnaryCall;
    createUser(request: iam_pb.CreateUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iam_pb.UserResponse) => void): grpc.ClientUnaryCall;
    createUser(request: iam_pb.CreateUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iam_pb.UserResponse) => void): grpc.ClientUnaryCall;
    getUser(request: iam_pb.GetUserRequest, callback: (error: grpc.ServiceError | null, response: iam_pb.UserResponse) => void): grpc.ClientUnaryCall;
    getUser(request: iam_pb.GetUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iam_pb.UserResponse) => void): grpc.ClientUnaryCall;
    getUser(request: iam_pb.GetUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iam_pb.UserResponse) => void): grpc.ClientUnaryCall;
    updateUser(request: iam_pb.UpdateUserRequest, callback: (error: grpc.ServiceError | null, response: iam_pb.UserResponse) => void): grpc.ClientUnaryCall;
    updateUser(request: iam_pb.UpdateUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iam_pb.UserResponse) => void): grpc.ClientUnaryCall;
    updateUser(request: iam_pb.UpdateUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iam_pb.UserResponse) => void): grpc.ClientUnaryCall;
    deleteUser(request: iam_pb.DeleteUserRequest, callback: (error: grpc.ServiceError | null, response: iam_pb.DeleteUserResponse) => void): grpc.ClientUnaryCall;
    deleteUser(request: iam_pb.DeleteUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iam_pb.DeleteUserResponse) => void): grpc.ClientUnaryCall;
    deleteUser(request: iam_pb.DeleteUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iam_pb.DeleteUserResponse) => void): grpc.ClientUnaryCall;
    listUsers(request: iam_pb.ListUsersRequest, callback: (error: grpc.ServiceError | null, response: iam_pb.ListUsersResponse) => void): grpc.ClientUnaryCall;
    listUsers(request: iam_pb.ListUsersRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iam_pb.ListUsersResponse) => void): grpc.ClientUnaryCall;
    listUsers(request: iam_pb.ListUsersRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iam_pb.ListUsersResponse) => void): grpc.ClientUnaryCall;
    createRole(request: iam_pb.CreateRoleRequest, callback: (error: grpc.ServiceError | null, response: iam_pb.RoleResponse) => void): grpc.ClientUnaryCall;
    createRole(request: iam_pb.CreateRoleRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iam_pb.RoleResponse) => void): grpc.ClientUnaryCall;
    createRole(request: iam_pb.CreateRoleRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iam_pb.RoleResponse) => void): grpc.ClientUnaryCall;
    getRole(request: iam_pb.GetRoleRequest, callback: (error: grpc.ServiceError | null, response: iam_pb.RoleResponse) => void): grpc.ClientUnaryCall;
    getRole(request: iam_pb.GetRoleRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iam_pb.RoleResponse) => void): grpc.ClientUnaryCall;
    getRole(request: iam_pb.GetRoleRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iam_pb.RoleResponse) => void): grpc.ClientUnaryCall;
    updateRole(request: iam_pb.UpdateRoleRequest, callback: (error: grpc.ServiceError | null, response: iam_pb.RoleResponse) => void): grpc.ClientUnaryCall;
    updateRole(request: iam_pb.UpdateRoleRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iam_pb.RoleResponse) => void): grpc.ClientUnaryCall;
    updateRole(request: iam_pb.UpdateRoleRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iam_pb.RoleResponse) => void): grpc.ClientUnaryCall;
    deleteRole(request: iam_pb.DeleteRoleRequest, callback: (error: grpc.ServiceError | null, response: iam_pb.DeleteRoleResponse) => void): grpc.ClientUnaryCall;
    deleteRole(request: iam_pb.DeleteRoleRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iam_pb.DeleteRoleResponse) => void): grpc.ClientUnaryCall;
    deleteRole(request: iam_pb.DeleteRoleRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iam_pb.DeleteRoleResponse) => void): grpc.ClientUnaryCall;
    listRoles(request: iam_pb.ListRolesRequest, callback: (error: grpc.ServiceError | null, response: iam_pb.ListRolesResponse) => void): grpc.ClientUnaryCall;
    listRoles(request: iam_pb.ListRolesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iam_pb.ListRolesResponse) => void): grpc.ClientUnaryCall;
    listRoles(request: iam_pb.ListRolesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iam_pb.ListRolesResponse) => void): grpc.ClientUnaryCall;
    assignRole(request: iam_pb.AssignRoleRequest, callback: (error: grpc.ServiceError | null, response: iam_pb.AssignRoleResponse) => void): grpc.ClientUnaryCall;
    assignRole(request: iam_pb.AssignRoleRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iam_pb.AssignRoleResponse) => void): grpc.ClientUnaryCall;
    assignRole(request: iam_pb.AssignRoleRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iam_pb.AssignRoleResponse) => void): grpc.ClientUnaryCall;
    revokeRole(request: iam_pb.RevokeRoleRequest, callback: (error: grpc.ServiceError | null, response: iam_pb.RevokeRoleResponse) => void): grpc.ClientUnaryCall;
    revokeRole(request: iam_pb.RevokeRoleRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iam_pb.RevokeRoleResponse) => void): grpc.ClientUnaryCall;
    revokeRole(request: iam_pb.RevokeRoleRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iam_pb.RevokeRoleResponse) => void): grpc.ClientUnaryCall;
    getUserRoles(request: iam_pb.GetUserRolesRequest, callback: (error: grpc.ServiceError | null, response: iam_pb.GetUserRolesResponse) => void): grpc.ClientUnaryCall;
    getUserRoles(request: iam_pb.GetUserRolesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iam_pb.GetUserRolesResponse) => void): grpc.ClientUnaryCall;
    getUserRoles(request: iam_pb.GetUserRolesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iam_pb.GetUserRolesResponse) => void): grpc.ClientUnaryCall;
    createPermission(request: iam_pb.CreatePermissionRequest, callback: (error: grpc.ServiceError | null, response: iam_pb.Permission) => void): grpc.ClientUnaryCall;
    createPermission(request: iam_pb.CreatePermissionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iam_pb.Permission) => void): grpc.ClientUnaryCall;
    createPermission(request: iam_pb.CreatePermissionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iam_pb.Permission) => void): grpc.ClientUnaryCall;
    listPermissions(request: iam_pb.ListPermissionsRequest, callback: (error: grpc.ServiceError | null, response: iam_pb.ListPermissionsResponse) => void): grpc.ClientUnaryCall;
    listPermissions(request: iam_pb.ListPermissionsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iam_pb.ListPermissionsResponse) => void): grpc.ClientUnaryCall;
    listPermissions(request: iam_pb.ListPermissionsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iam_pb.ListPermissionsResponse) => void): grpc.ClientUnaryCall;
    login(request: iam_pb.LoginRequest, callback: (error: grpc.ServiceError | null, response: iam_pb.LoginResponse) => void): grpc.ClientUnaryCall;
    login(request: iam_pb.LoginRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iam_pb.LoginResponse) => void): grpc.ClientUnaryCall;
    login(request: iam_pb.LoginRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iam_pb.LoginResponse) => void): grpc.ClientUnaryCall;
    logout(request: iam_pb.LogoutRequest, callback: (error: grpc.ServiceError | null, response: iam_pb.LogoutResponse) => void): grpc.ClientUnaryCall;
    logout(request: iam_pb.LogoutRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iam_pb.LogoutResponse) => void): grpc.ClientUnaryCall;
    logout(request: iam_pb.LogoutRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iam_pb.LogoutResponse) => void): grpc.ClientUnaryCall;
    refreshToken(request: iam_pb.RefreshTokenRequest, callback: (error: grpc.ServiceError | null, response: iam_pb.LoginResponse) => void): grpc.ClientUnaryCall;
    refreshToken(request: iam_pb.RefreshTokenRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iam_pb.LoginResponse) => void): grpc.ClientUnaryCall;
    refreshToken(request: iam_pb.RefreshTokenRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iam_pb.LoginResponse) => void): grpc.ClientUnaryCall;
    validateToken(request: iam_pb.ValidateTokenRequest, callback: (error: grpc.ServiceError | null, response: iam_pb.ValidateTokenResponse) => void): grpc.ClientUnaryCall;
    validateToken(request: iam_pb.ValidateTokenRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iam_pb.ValidateTokenResponse) => void): grpc.ClientUnaryCall;
    validateToken(request: iam_pb.ValidateTokenRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iam_pb.ValidateTokenResponse) => void): grpc.ClientUnaryCall;
}

export class IAMServiceClient extends grpc.Client implements IIAMServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public checkPermission(request: iam_pb.PermissionRequest, callback: (error: grpc.ServiceError | null, response: iam_pb.PermissionResponse) => void): grpc.ClientUnaryCall;
    public checkPermission(request: iam_pb.PermissionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iam_pb.PermissionResponse) => void): grpc.ClientUnaryCall;
    public checkPermission(request: iam_pb.PermissionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iam_pb.PermissionResponse) => void): grpc.ClientUnaryCall;
    public batchCheck(request: iam_pb.BatchPermissionRequest, callback: (error: grpc.ServiceError | null, response: iam_pb.BatchPermissionResponse) => void): grpc.ClientUnaryCall;
    public batchCheck(request: iam_pb.BatchPermissionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iam_pb.BatchPermissionResponse) => void): grpc.ClientUnaryCall;
    public batchCheck(request: iam_pb.BatchPermissionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iam_pb.BatchPermissionResponse) => void): grpc.ClientUnaryCall;
    public createUser(request: iam_pb.CreateUserRequest, callback: (error: grpc.ServiceError | null, response: iam_pb.UserResponse) => void): grpc.ClientUnaryCall;
    public createUser(request: iam_pb.CreateUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iam_pb.UserResponse) => void): grpc.ClientUnaryCall;
    public createUser(request: iam_pb.CreateUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iam_pb.UserResponse) => void): grpc.ClientUnaryCall;
    public getUser(request: iam_pb.GetUserRequest, callback: (error: grpc.ServiceError | null, response: iam_pb.UserResponse) => void): grpc.ClientUnaryCall;
    public getUser(request: iam_pb.GetUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iam_pb.UserResponse) => void): grpc.ClientUnaryCall;
    public getUser(request: iam_pb.GetUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iam_pb.UserResponse) => void): grpc.ClientUnaryCall;
    public updateUser(request: iam_pb.UpdateUserRequest, callback: (error: grpc.ServiceError | null, response: iam_pb.UserResponse) => void): grpc.ClientUnaryCall;
    public updateUser(request: iam_pb.UpdateUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iam_pb.UserResponse) => void): grpc.ClientUnaryCall;
    public updateUser(request: iam_pb.UpdateUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iam_pb.UserResponse) => void): grpc.ClientUnaryCall;
    public deleteUser(request: iam_pb.DeleteUserRequest, callback: (error: grpc.ServiceError | null, response: iam_pb.DeleteUserResponse) => void): grpc.ClientUnaryCall;
    public deleteUser(request: iam_pb.DeleteUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iam_pb.DeleteUserResponse) => void): grpc.ClientUnaryCall;
    public deleteUser(request: iam_pb.DeleteUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iam_pb.DeleteUserResponse) => void): grpc.ClientUnaryCall;
    public listUsers(request: iam_pb.ListUsersRequest, callback: (error: grpc.ServiceError | null, response: iam_pb.ListUsersResponse) => void): grpc.ClientUnaryCall;
    public listUsers(request: iam_pb.ListUsersRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iam_pb.ListUsersResponse) => void): grpc.ClientUnaryCall;
    public listUsers(request: iam_pb.ListUsersRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iam_pb.ListUsersResponse) => void): grpc.ClientUnaryCall;
    public createRole(request: iam_pb.CreateRoleRequest, callback: (error: grpc.ServiceError | null, response: iam_pb.RoleResponse) => void): grpc.ClientUnaryCall;
    public createRole(request: iam_pb.CreateRoleRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iam_pb.RoleResponse) => void): grpc.ClientUnaryCall;
    public createRole(request: iam_pb.CreateRoleRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iam_pb.RoleResponse) => void): grpc.ClientUnaryCall;
    public getRole(request: iam_pb.GetRoleRequest, callback: (error: grpc.ServiceError | null, response: iam_pb.RoleResponse) => void): grpc.ClientUnaryCall;
    public getRole(request: iam_pb.GetRoleRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iam_pb.RoleResponse) => void): grpc.ClientUnaryCall;
    public getRole(request: iam_pb.GetRoleRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iam_pb.RoleResponse) => void): grpc.ClientUnaryCall;
    public updateRole(request: iam_pb.UpdateRoleRequest, callback: (error: grpc.ServiceError | null, response: iam_pb.RoleResponse) => void): grpc.ClientUnaryCall;
    public updateRole(request: iam_pb.UpdateRoleRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iam_pb.RoleResponse) => void): grpc.ClientUnaryCall;
    public updateRole(request: iam_pb.UpdateRoleRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iam_pb.RoleResponse) => void): grpc.ClientUnaryCall;
    public deleteRole(request: iam_pb.DeleteRoleRequest, callback: (error: grpc.ServiceError | null, response: iam_pb.DeleteRoleResponse) => void): grpc.ClientUnaryCall;
    public deleteRole(request: iam_pb.DeleteRoleRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iam_pb.DeleteRoleResponse) => void): grpc.ClientUnaryCall;
    public deleteRole(request: iam_pb.DeleteRoleRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iam_pb.DeleteRoleResponse) => void): grpc.ClientUnaryCall;
    public listRoles(request: iam_pb.ListRolesRequest, callback: (error: grpc.ServiceError | null, response: iam_pb.ListRolesResponse) => void): grpc.ClientUnaryCall;
    public listRoles(request: iam_pb.ListRolesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iam_pb.ListRolesResponse) => void): grpc.ClientUnaryCall;
    public listRoles(request: iam_pb.ListRolesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iam_pb.ListRolesResponse) => void): grpc.ClientUnaryCall;
    public assignRole(request: iam_pb.AssignRoleRequest, callback: (error: grpc.ServiceError | null, response: iam_pb.AssignRoleResponse) => void): grpc.ClientUnaryCall;
    public assignRole(request: iam_pb.AssignRoleRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iam_pb.AssignRoleResponse) => void): grpc.ClientUnaryCall;
    public assignRole(request: iam_pb.AssignRoleRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iam_pb.AssignRoleResponse) => void): grpc.ClientUnaryCall;
    public revokeRole(request: iam_pb.RevokeRoleRequest, callback: (error: grpc.ServiceError | null, response: iam_pb.RevokeRoleResponse) => void): grpc.ClientUnaryCall;
    public revokeRole(request: iam_pb.RevokeRoleRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iam_pb.RevokeRoleResponse) => void): grpc.ClientUnaryCall;
    public revokeRole(request: iam_pb.RevokeRoleRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iam_pb.RevokeRoleResponse) => void): grpc.ClientUnaryCall;
    public getUserRoles(request: iam_pb.GetUserRolesRequest, callback: (error: grpc.ServiceError | null, response: iam_pb.GetUserRolesResponse) => void): grpc.ClientUnaryCall;
    public getUserRoles(request: iam_pb.GetUserRolesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iam_pb.GetUserRolesResponse) => void): grpc.ClientUnaryCall;
    public getUserRoles(request: iam_pb.GetUserRolesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iam_pb.GetUserRolesResponse) => void): grpc.ClientUnaryCall;
    public createPermission(request: iam_pb.CreatePermissionRequest, callback: (error: grpc.ServiceError | null, response: iam_pb.Permission) => void): grpc.ClientUnaryCall;
    public createPermission(request: iam_pb.CreatePermissionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iam_pb.Permission) => void): grpc.ClientUnaryCall;
    public createPermission(request: iam_pb.CreatePermissionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iam_pb.Permission) => void): grpc.ClientUnaryCall;
    public listPermissions(request: iam_pb.ListPermissionsRequest, callback: (error: grpc.ServiceError | null, response: iam_pb.ListPermissionsResponse) => void): grpc.ClientUnaryCall;
    public listPermissions(request: iam_pb.ListPermissionsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iam_pb.ListPermissionsResponse) => void): grpc.ClientUnaryCall;
    public listPermissions(request: iam_pb.ListPermissionsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iam_pb.ListPermissionsResponse) => void): grpc.ClientUnaryCall;
    public login(request: iam_pb.LoginRequest, callback: (error: grpc.ServiceError | null, response: iam_pb.LoginResponse) => void): grpc.ClientUnaryCall;
    public login(request: iam_pb.LoginRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iam_pb.LoginResponse) => void): grpc.ClientUnaryCall;
    public login(request: iam_pb.LoginRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iam_pb.LoginResponse) => void): grpc.ClientUnaryCall;
    public logout(request: iam_pb.LogoutRequest, callback: (error: grpc.ServiceError | null, response: iam_pb.LogoutResponse) => void): grpc.ClientUnaryCall;
    public logout(request: iam_pb.LogoutRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iam_pb.LogoutResponse) => void): grpc.ClientUnaryCall;
    public logout(request: iam_pb.LogoutRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iam_pb.LogoutResponse) => void): grpc.ClientUnaryCall;
    public refreshToken(request: iam_pb.RefreshTokenRequest, callback: (error: grpc.ServiceError | null, response: iam_pb.LoginResponse) => void): grpc.ClientUnaryCall;
    public refreshToken(request: iam_pb.RefreshTokenRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iam_pb.LoginResponse) => void): grpc.ClientUnaryCall;
    public refreshToken(request: iam_pb.RefreshTokenRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iam_pb.LoginResponse) => void): grpc.ClientUnaryCall;
    public validateToken(request: iam_pb.ValidateTokenRequest, callback: (error: grpc.ServiceError | null, response: iam_pb.ValidateTokenResponse) => void): grpc.ClientUnaryCall;
    public validateToken(request: iam_pb.ValidateTokenRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: iam_pb.ValidateTokenResponse) => void): grpc.ClientUnaryCall;
    public validateToken(request: iam_pb.ValidateTokenRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: iam_pb.ValidateTokenResponse) => void): grpc.ClientUnaryCall;
}
