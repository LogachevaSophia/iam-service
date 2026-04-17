// package: iam
// file: iam.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class PermissionRequest extends jspb.Message { 
    getUserId(): string;
    setUserId(value: string): PermissionRequest;
    getAction(): string;
    setAction(value: string): PermissionRequest;
    getResource(): string;
    setResource(value: string): PermissionRequest;

    hasResourceId(): boolean;
    clearResourceId(): void;
    getResourceId(): string | undefined;
    setResourceId(value: string): PermissionRequest;

    getMetadataMap(): jspb.Map<string, string>;
    clearMetadataMap(): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PermissionRequest.AsObject;
    static toObject(includeInstance: boolean, msg: PermissionRequest): PermissionRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PermissionRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PermissionRequest;
    static deserializeBinaryFromReader(message: PermissionRequest, reader: jspb.BinaryReader): PermissionRequest;
}

export namespace PermissionRequest {
    export type AsObject = {
        userId: string,
        action: string,
        resource: string,
        resourceId?: string,

        metadataMap: Array<[string, string]>,
    }
}

export class PermissionResponse extends jspb.Message { 
    getAllowed(): boolean;
    setAllowed(value: boolean): PermissionResponse;
    getReason(): string;
    setReason(value: string): PermissionResponse;
    clearConstraintsList(): void;
    getConstraintsList(): Array<string>;
    setConstraintsList(value: Array<string>): PermissionResponse;
    addConstraints(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PermissionResponse.AsObject;
    static toObject(includeInstance: boolean, msg: PermissionResponse): PermissionResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PermissionResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PermissionResponse;
    static deserializeBinaryFromReader(message: PermissionResponse, reader: jspb.BinaryReader): PermissionResponse;
}

export namespace PermissionResponse {
    export type AsObject = {
        allowed: boolean,
        reason: string,
        constraintsList: Array<string>,
    }
}

export class BatchPermissionRequest extends jspb.Message { 
    getUserId(): string;
    setUserId(value: string): BatchPermissionRequest;
    clearPermissionsList(): void;
    getPermissionsList(): Array<PermissionRequest>;
    setPermissionsList(value: Array<PermissionRequest>): BatchPermissionRequest;
    addPermissions(value?: PermissionRequest, index?: number): PermissionRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BatchPermissionRequest.AsObject;
    static toObject(includeInstance: boolean, msg: BatchPermissionRequest): BatchPermissionRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BatchPermissionRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BatchPermissionRequest;
    static deserializeBinaryFromReader(message: BatchPermissionRequest, reader: jspb.BinaryReader): BatchPermissionRequest;
}

export namespace BatchPermissionRequest {
    export type AsObject = {
        userId: string,
        permissionsList: Array<PermissionRequest.AsObject>,
    }
}

export class BatchPermissionResponse extends jspb.Message { 
    clearResultsList(): void;
    getResultsList(): Array<PermissionResponse>;
    setResultsList(value: Array<PermissionResponse>): BatchPermissionResponse;
    addResults(value?: PermissionResponse, index?: number): PermissionResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BatchPermissionResponse.AsObject;
    static toObject(includeInstance: boolean, msg: BatchPermissionResponse): BatchPermissionResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BatchPermissionResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BatchPermissionResponse;
    static deserializeBinaryFromReader(message: BatchPermissionResponse, reader: jspb.BinaryReader): BatchPermissionResponse;
}

export namespace BatchPermissionResponse {
    export type AsObject = {
        resultsList: Array<PermissionResponse.AsObject>,
    }
}

export class CreateUserRequest extends jspb.Message { 
    getEmail(): string;
    setEmail(value: string): CreateUserRequest;
    getPassword(): string;
    setPassword(value: string): CreateUserRequest;
    getFirstName(): string;
    setFirstName(value: string): CreateUserRequest;
    getLastName(): string;
    setLastName(value: string): CreateUserRequest;

    hasSpecialty(): boolean;
    clearSpecialty(): void;
    getSpecialty(): string | undefined;
    setSpecialty(value: string): CreateUserRequest;

    hasDepartment(): boolean;
    clearDepartment(): void;
    getDepartment(): string | undefined;
    setDepartment(value: string): CreateUserRequest;

    getMetadataMap(): jspb.Map<string, string>;
    clearMetadataMap(): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateUserRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CreateUserRequest): CreateUserRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateUserRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateUserRequest;
    static deserializeBinaryFromReader(message: CreateUserRequest, reader: jspb.BinaryReader): CreateUserRequest;
}

export namespace CreateUserRequest {
    export type AsObject = {
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        specialty?: string,
        department?: string,

        metadataMap: Array<[string, string]>,
    }
}

export class UserResponse extends jspb.Message { 
    getId(): string;
    setId(value: string): UserResponse;
    getEmail(): string;
    setEmail(value: string): UserResponse;
    getFirstName(): string;
    setFirstName(value: string): UserResponse;
    getLastName(): string;
    setLastName(value: string): UserResponse;

    hasSpecialty(): boolean;
    clearSpecialty(): void;
    getSpecialty(): string | undefined;
    setSpecialty(value: string): UserResponse;

    hasDepartment(): boolean;
    clearDepartment(): void;
    getDepartment(): string | undefined;
    setDepartment(value: string): UserResponse;
    getIsActive(): boolean;
    setIsActive(value: boolean): UserResponse;

    getMetadataMap(): jspb.Map<string, string>;
    clearMetadataMap(): void;
    getCreatedAt(): string;
    setCreatedAt(value: string): UserResponse;

    hasLastLoginAt(): boolean;
    clearLastLoginAt(): void;
    getLastLoginAt(): string | undefined;
    setLastLoginAt(value: string): UserResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UserResponse.AsObject;
    static toObject(includeInstance: boolean, msg: UserResponse): UserResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UserResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UserResponse;
    static deserializeBinaryFromReader(message: UserResponse, reader: jspb.BinaryReader): UserResponse;
}

export namespace UserResponse {
    export type AsObject = {
        id: string,
        email: string,
        firstName: string,
        lastName: string,
        specialty?: string,
        department?: string,
        isActive: boolean,

        metadataMap: Array<[string, string]>,
        createdAt: string,
        lastLoginAt?: string,
    }
}

export class GetUserRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): GetUserRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetUserRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetUserRequest): GetUserRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetUserRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetUserRequest;
    static deserializeBinaryFromReader(message: GetUserRequest, reader: jspb.BinaryReader): GetUserRequest;
}

export namespace GetUserRequest {
    export type AsObject = {
        id: string,
    }
}

export class UpdateUserRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): UpdateUserRequest;

    hasEmail(): boolean;
    clearEmail(): void;
    getEmail(): string | undefined;
    setEmail(value: string): UpdateUserRequest;

    hasFirstName(): boolean;
    clearFirstName(): void;
    getFirstName(): string | undefined;
    setFirstName(value: string): UpdateUserRequest;

    hasLastName(): boolean;
    clearLastName(): void;
    getLastName(): string | undefined;
    setLastName(value: string): UpdateUserRequest;

    hasSpecialty(): boolean;
    clearSpecialty(): void;
    getSpecialty(): string | undefined;
    setSpecialty(value: string): UpdateUserRequest;

    hasDepartment(): boolean;
    clearDepartment(): void;
    getDepartment(): string | undefined;
    setDepartment(value: string): UpdateUserRequest;

    hasIsActive(): boolean;
    clearIsActive(): void;
    getIsActive(): boolean | undefined;
    setIsActive(value: boolean): UpdateUserRequest;

    getMetadataMap(): jspb.Map<string, string>;
    clearMetadataMap(): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateUserRequest.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateUserRequest): UpdateUserRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateUserRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateUserRequest;
    static deserializeBinaryFromReader(message: UpdateUserRequest, reader: jspb.BinaryReader): UpdateUserRequest;
}

export namespace UpdateUserRequest {
    export type AsObject = {
        id: string,
        email?: string,
        firstName?: string,
        lastName?: string,
        specialty?: string,
        department?: string,
        isActive?: boolean,

        metadataMap: Array<[string, string]>,
    }
}

export class DeleteUserRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): DeleteUserRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteUserRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteUserRequest): DeleteUserRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteUserRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteUserRequest;
    static deserializeBinaryFromReader(message: DeleteUserRequest, reader: jspb.BinaryReader): DeleteUserRequest;
}

export namespace DeleteUserRequest {
    export type AsObject = {
        id: string,
    }
}

export class DeleteUserResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): DeleteUserResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteUserResponse.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteUserResponse): DeleteUserResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteUserResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteUserResponse;
    static deserializeBinaryFromReader(message: DeleteUserResponse, reader: jspb.BinaryReader): DeleteUserResponse;
}

export namespace DeleteUserResponse {
    export type AsObject = {
        success: boolean,
    }
}

export class ListUsersRequest extends jspb.Message { 
    getPage(): number;
    setPage(value: number): ListUsersRequest;
    getPageSize(): number;
    setPageSize(value: number): ListUsersRequest;

    hasSpecialty(): boolean;
    clearSpecialty(): void;
    getSpecialty(): string | undefined;
    setSpecialty(value: string): ListUsersRequest;

    hasIsActive(): boolean;
    clearIsActive(): void;
    getIsActive(): boolean | undefined;
    setIsActive(value: boolean): ListUsersRequest;
    getSortBy(): string;
    setSortBy(value: string): ListUsersRequest;
    getSortOrder(): string;
    setSortOrder(value: string): ListUsersRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListUsersRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ListUsersRequest): ListUsersRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListUsersRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListUsersRequest;
    static deserializeBinaryFromReader(message: ListUsersRequest, reader: jspb.BinaryReader): ListUsersRequest;
}

export namespace ListUsersRequest {
    export type AsObject = {
        page: number,
        pageSize: number,
        specialty?: string,
        isActive?: boolean,
        sortBy: string,
        sortOrder: string,
    }
}

export class ListUsersResponse extends jspb.Message { 
    clearUsersList(): void;
    getUsersList(): Array<UserResponse>;
    setUsersList(value: Array<UserResponse>): ListUsersResponse;
    addUsers(value?: UserResponse, index?: number): UserResponse;
    getTotal(): number;
    setTotal(value: number): ListUsersResponse;
    getPage(): number;
    setPage(value: number): ListUsersResponse;
    getPageSize(): number;
    setPageSize(value: number): ListUsersResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListUsersResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ListUsersResponse): ListUsersResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListUsersResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListUsersResponse;
    static deserializeBinaryFromReader(message: ListUsersResponse, reader: jspb.BinaryReader): ListUsersResponse;
}

export namespace ListUsersResponse {
    export type AsObject = {
        usersList: Array<UserResponse.AsObject>,
        total: number,
        page: number,
        pageSize: number,
    }
}

export class CreateRoleRequest extends jspb.Message { 
    getName(): string;
    setName(value: string): CreateRoleRequest;
    getDescription(): string;
    setDescription(value: string): CreateRoleRequest;
    clearPermissionIdsList(): void;
    getPermissionIdsList(): Array<string>;
    setPermissionIdsList(value: Array<string>): CreateRoleRequest;
    addPermissionIds(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateRoleRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CreateRoleRequest): CreateRoleRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateRoleRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateRoleRequest;
    static deserializeBinaryFromReader(message: CreateRoleRequest, reader: jspb.BinaryReader): CreateRoleRequest;
}

export namespace CreateRoleRequest {
    export type AsObject = {
        name: string,
        description: string,
        permissionIdsList: Array<string>,
    }
}

export class RoleResponse extends jspb.Message { 
    getId(): string;
    setId(value: string): RoleResponse;
    getName(): string;
    setName(value: string): RoleResponse;
    getDescription(): string;
    setDescription(value: string): RoleResponse;
    getIsSystem(): boolean;
    setIsSystem(value: boolean): RoleResponse;
    getCreatedAt(): string;
    setCreatedAt(value: string): RoleResponse;
    clearPermissionsList(): void;
    getPermissionsList(): Array<Permission>;
    setPermissionsList(value: Array<Permission>): RoleResponse;
    addPermissions(value?: Permission, index?: number): Permission;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RoleResponse.AsObject;
    static toObject(includeInstance: boolean, msg: RoleResponse): RoleResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RoleResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RoleResponse;
    static deserializeBinaryFromReader(message: RoleResponse, reader: jspb.BinaryReader): RoleResponse;
}

export namespace RoleResponse {
    export type AsObject = {
        id: string,
        name: string,
        description: string,
        isSystem: boolean,
        createdAt: string,
        permissionsList: Array<Permission.AsObject>,
    }
}

export class GetRoleRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): GetRoleRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetRoleRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetRoleRequest): GetRoleRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetRoleRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetRoleRequest;
    static deserializeBinaryFromReader(message: GetRoleRequest, reader: jspb.BinaryReader): GetRoleRequest;
}

export namespace GetRoleRequest {
    export type AsObject = {
        id: string,
    }
}

export class UpdateRoleRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): UpdateRoleRequest;

    hasName(): boolean;
    clearName(): void;
    getName(): string | undefined;
    setName(value: string): UpdateRoleRequest;

    hasDescription(): boolean;
    clearDescription(): void;
    getDescription(): string | undefined;
    setDescription(value: string): UpdateRoleRequest;
    clearPermissionIdsList(): void;
    getPermissionIdsList(): Array<string>;
    setPermissionIdsList(value: Array<string>): UpdateRoleRequest;
    addPermissionIds(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateRoleRequest.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateRoleRequest): UpdateRoleRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateRoleRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateRoleRequest;
    static deserializeBinaryFromReader(message: UpdateRoleRequest, reader: jspb.BinaryReader): UpdateRoleRequest;
}

export namespace UpdateRoleRequest {
    export type AsObject = {
        id: string,
        name?: string,
        description?: string,
        permissionIdsList: Array<string>,
    }
}

export class DeleteRoleRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): DeleteRoleRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteRoleRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteRoleRequest): DeleteRoleRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteRoleRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteRoleRequest;
    static deserializeBinaryFromReader(message: DeleteRoleRequest, reader: jspb.BinaryReader): DeleteRoleRequest;
}

export namespace DeleteRoleRequest {
    export type AsObject = {
        id: string,
    }
}

export class DeleteRoleResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): DeleteRoleResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteRoleResponse.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteRoleResponse): DeleteRoleResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteRoleResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteRoleResponse;
    static deserializeBinaryFromReader(message: DeleteRoleResponse, reader: jspb.BinaryReader): DeleteRoleResponse;
}

export namespace DeleteRoleResponse {
    export type AsObject = {
        success: boolean,
    }
}

export class ListRolesRequest extends jspb.Message { 
    getPage(): number;
    setPage(value: number): ListRolesRequest;
    getPageSize(): number;
    setPageSize(value: number): ListRolesRequest;
    getIncludeSystem(): boolean;
    setIncludeSystem(value: boolean): ListRolesRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListRolesRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ListRolesRequest): ListRolesRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListRolesRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListRolesRequest;
    static deserializeBinaryFromReader(message: ListRolesRequest, reader: jspb.BinaryReader): ListRolesRequest;
}

export namespace ListRolesRequest {
    export type AsObject = {
        page: number,
        pageSize: number,
        includeSystem: boolean,
    }
}

export class ListRolesResponse extends jspb.Message { 
    clearRolesList(): void;
    getRolesList(): Array<RoleResponse>;
    setRolesList(value: Array<RoleResponse>): ListRolesResponse;
    addRoles(value?: RoleResponse, index?: number): RoleResponse;
    getTotal(): number;
    setTotal(value: number): ListRolesResponse;
    getPage(): number;
    setPage(value: number): ListRolesResponse;
    getPageSize(): number;
    setPageSize(value: number): ListRolesResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListRolesResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ListRolesResponse): ListRolesResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListRolesResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListRolesResponse;
    static deserializeBinaryFromReader(message: ListRolesResponse, reader: jspb.BinaryReader): ListRolesResponse;
}

export namespace ListRolesResponse {
    export type AsObject = {
        rolesList: Array<RoleResponse.AsObject>,
        total: number,
        page: number,
        pageSize: number,
    }
}

export class AssignRoleRequest extends jspb.Message { 
    getUserId(): string;
    setUserId(value: string): AssignRoleRequest;
    getRoleId(): string;
    setRoleId(value: string): AssignRoleRequest;

    getScopeMap(): jspb.Map<string, string>;
    clearScopeMap(): void;

    hasExpiresInDays(): boolean;
    clearExpiresInDays(): void;
    getExpiresInDays(): number | undefined;
    setExpiresInDays(value: number): AssignRoleRequest;
    getGrantedBy(): string;
    setGrantedBy(value: string): AssignRoleRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AssignRoleRequest.AsObject;
    static toObject(includeInstance: boolean, msg: AssignRoleRequest): AssignRoleRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AssignRoleRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AssignRoleRequest;
    static deserializeBinaryFromReader(message: AssignRoleRequest, reader: jspb.BinaryReader): AssignRoleRequest;
}

export namespace AssignRoleRequest {
    export type AsObject = {
        userId: string,
        roleId: string,

        scopeMap: Array<[string, string]>,
        expiresInDays?: number,
        grantedBy: string,
    }
}

export class AssignRoleResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): AssignRoleResponse;
    getMessage(): string;
    setMessage(value: string): AssignRoleResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AssignRoleResponse.AsObject;
    static toObject(includeInstance: boolean, msg: AssignRoleResponse): AssignRoleResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AssignRoleResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AssignRoleResponse;
    static deserializeBinaryFromReader(message: AssignRoleResponse, reader: jspb.BinaryReader): AssignRoleResponse;
}

export namespace AssignRoleResponse {
    export type AsObject = {
        success: boolean,
        message: string,
    }
}

export class RevokeRoleRequest extends jspb.Message { 
    getUserId(): string;
    setUserId(value: string): RevokeRoleRequest;
    getRoleId(): string;
    setRoleId(value: string): RevokeRoleRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RevokeRoleRequest.AsObject;
    static toObject(includeInstance: boolean, msg: RevokeRoleRequest): RevokeRoleRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RevokeRoleRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RevokeRoleRequest;
    static deserializeBinaryFromReader(message: RevokeRoleRequest, reader: jspb.BinaryReader): RevokeRoleRequest;
}

export namespace RevokeRoleRequest {
    export type AsObject = {
        userId: string,
        roleId: string,
    }
}

export class RevokeRoleResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): RevokeRoleResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RevokeRoleResponse.AsObject;
    static toObject(includeInstance: boolean, msg: RevokeRoleResponse): RevokeRoleResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RevokeRoleResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RevokeRoleResponse;
    static deserializeBinaryFromReader(message: RevokeRoleResponse, reader: jspb.BinaryReader): RevokeRoleResponse;
}

export namespace RevokeRoleResponse {
    export type AsObject = {
        success: boolean,
    }
}

export class GetUserRolesRequest extends jspb.Message { 
    getUserId(): string;
    setUserId(value: string): GetUserRolesRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetUserRolesRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetUserRolesRequest): GetUserRolesRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetUserRolesRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetUserRolesRequest;
    static deserializeBinaryFromReader(message: GetUserRolesRequest, reader: jspb.BinaryReader): GetUserRolesRequest;
}

export namespace GetUserRolesRequest {
    export type AsObject = {
        userId: string,
    }
}

export class GetUserRolesResponse extends jspb.Message { 
    clearRolesList(): void;
    getRolesList(): Array<UserRoleInfo>;
    setRolesList(value: Array<UserRoleInfo>): GetUserRolesResponse;
    addRoles(value?: UserRoleInfo, index?: number): UserRoleInfo;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetUserRolesResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetUserRolesResponse): GetUserRolesResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetUserRolesResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetUserRolesResponse;
    static deserializeBinaryFromReader(message: GetUserRolesResponse, reader: jspb.BinaryReader): GetUserRolesResponse;
}

export namespace GetUserRolesResponse {
    export type AsObject = {
        rolesList: Array<UserRoleInfo.AsObject>,
    }
}

export class UserRoleInfo extends jspb.Message { 
    getRoleId(): string;
    setRoleId(value: string): UserRoleInfo;
    getRoleName(): string;
    setRoleName(value: string): UserRoleInfo;

    getScopeMap(): jspb.Map<string, string>;
    clearScopeMap(): void;
    getGrantedAt(): string;
    setGrantedAt(value: string): UserRoleInfo;

    hasExpiresAt(): boolean;
    clearExpiresAt(): void;
    getExpiresAt(): string | undefined;
    setExpiresAt(value: string): UserRoleInfo;
    clearPermissionsList(): void;
    getPermissionsList(): Array<Permission>;
    setPermissionsList(value: Array<Permission>): UserRoleInfo;
    addPermissions(value?: Permission, index?: number): Permission;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UserRoleInfo.AsObject;
    static toObject(includeInstance: boolean, msg: UserRoleInfo): UserRoleInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UserRoleInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UserRoleInfo;
    static deserializeBinaryFromReader(message: UserRoleInfo, reader: jspb.BinaryReader): UserRoleInfo;
}

export namespace UserRoleInfo {
    export type AsObject = {
        roleId: string,
        roleName: string,

        scopeMap: Array<[string, string]>,
        grantedAt: string,
        expiresAt?: string,
        permissionsList: Array<Permission.AsObject>,
    }
}

export class Permission extends jspb.Message { 
    getId(): string;
    setId(value: string): Permission;
    getAction(): string;
    setAction(value: string): Permission;
    getResource(): string;
    setResource(value: string): Permission;
    getConditions(): string;
    setConditions(value: string): Permission;
    getDescription(): string;
    setDescription(value: string): Permission;
    getCreatedAt(): string;
    setCreatedAt(value: string): Permission;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Permission.AsObject;
    static toObject(includeInstance: boolean, msg: Permission): Permission.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Permission, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Permission;
    static deserializeBinaryFromReader(message: Permission, reader: jspb.BinaryReader): Permission;
}

export namespace Permission {
    export type AsObject = {
        id: string,
        action: string,
        resource: string,
        conditions: string,
        description: string,
        createdAt: string,
    }
}

export class CreatePermissionRequest extends jspb.Message { 
    getAction(): string;
    setAction(value: string): CreatePermissionRequest;
    getResource(): string;
    setResource(value: string): CreatePermissionRequest;
    getConditions(): string;
    setConditions(value: string): CreatePermissionRequest;
    getDescription(): string;
    setDescription(value: string): CreatePermissionRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreatePermissionRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CreatePermissionRequest): CreatePermissionRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreatePermissionRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreatePermissionRequest;
    static deserializeBinaryFromReader(message: CreatePermissionRequest, reader: jspb.BinaryReader): CreatePermissionRequest;
}

export namespace CreatePermissionRequest {
    export type AsObject = {
        action: string,
        resource: string,
        conditions: string,
        description: string,
    }
}

export class ListPermissionsRequest extends jspb.Message { 
    getPage(): number;
    setPage(value: number): ListPermissionsRequest;
    getPageSize(): number;
    setPageSize(value: number): ListPermissionsRequest;

    hasAction(): boolean;
    clearAction(): void;
    getAction(): string | undefined;
    setAction(value: string): ListPermissionsRequest;

    hasResource(): boolean;
    clearResource(): void;
    getResource(): string | undefined;
    setResource(value: string): ListPermissionsRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListPermissionsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ListPermissionsRequest): ListPermissionsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListPermissionsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListPermissionsRequest;
    static deserializeBinaryFromReader(message: ListPermissionsRequest, reader: jspb.BinaryReader): ListPermissionsRequest;
}

export namespace ListPermissionsRequest {
    export type AsObject = {
        page: number,
        pageSize: number,
        action?: string,
        resource?: string,
    }
}

export class ListPermissionsResponse extends jspb.Message { 
    clearPermissionsList(): void;
    getPermissionsList(): Array<Permission>;
    setPermissionsList(value: Array<Permission>): ListPermissionsResponse;
    addPermissions(value?: Permission, index?: number): Permission;
    getTotal(): number;
    setTotal(value: number): ListPermissionsResponse;
    getPage(): number;
    setPage(value: number): ListPermissionsResponse;
    getPageSize(): number;
    setPageSize(value: number): ListPermissionsResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListPermissionsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ListPermissionsResponse): ListPermissionsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListPermissionsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListPermissionsResponse;
    static deserializeBinaryFromReader(message: ListPermissionsResponse, reader: jspb.BinaryReader): ListPermissionsResponse;
}

export namespace ListPermissionsResponse {
    export type AsObject = {
        permissionsList: Array<Permission.AsObject>,
        total: number,
        page: number,
        pageSize: number,
    }
}

export class LoginRequest extends jspb.Message { 
    getEmail(): string;
    setEmail(value: string): LoginRequest;
    getPassword(): string;
    setPassword(value: string): LoginRequest;

    hasUserAgent(): boolean;
    clearUserAgent(): void;
    getUserAgent(): string | undefined;
    setUserAgent(value: string): LoginRequest;

    hasIpAddress(): boolean;
    clearIpAddress(): void;
    getIpAddress(): string | undefined;
    setIpAddress(value: string): LoginRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LoginRequest.AsObject;
    static toObject(includeInstance: boolean, msg: LoginRequest): LoginRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LoginRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LoginRequest;
    static deserializeBinaryFromReader(message: LoginRequest, reader: jspb.BinaryReader): LoginRequest;
}

export namespace LoginRequest {
    export type AsObject = {
        email: string,
        password: string,
        userAgent?: string,
        ipAddress?: string,
    }
}

export class LoginResponse extends jspb.Message { 
    getAccessToken(): string;
    setAccessToken(value: string): LoginResponse;
    getRefreshToken(): string;
    setRefreshToken(value: string): LoginResponse;
    getExpiresIn(): number;
    setExpiresIn(value: number): LoginResponse;

    hasUser(): boolean;
    clearUser(): void;
    getUser(): UserResponse | undefined;
    setUser(value?: UserResponse): LoginResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LoginResponse.AsObject;
    static toObject(includeInstance: boolean, msg: LoginResponse): LoginResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LoginResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LoginResponse;
    static deserializeBinaryFromReader(message: LoginResponse, reader: jspb.BinaryReader): LoginResponse;
}

export namespace LoginResponse {
    export type AsObject = {
        accessToken: string,
        refreshToken: string,
        expiresIn: number,
        user?: UserResponse.AsObject,
    }
}

export class LogoutRequest extends jspb.Message { 
    getToken(): string;
    setToken(value: string): LogoutRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LogoutRequest.AsObject;
    static toObject(includeInstance: boolean, msg: LogoutRequest): LogoutRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LogoutRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LogoutRequest;
    static deserializeBinaryFromReader(message: LogoutRequest, reader: jspb.BinaryReader): LogoutRequest;
}

export namespace LogoutRequest {
    export type AsObject = {
        token: string,
    }
}

export class LogoutResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): LogoutResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LogoutResponse.AsObject;
    static toObject(includeInstance: boolean, msg: LogoutResponse): LogoutResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LogoutResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LogoutResponse;
    static deserializeBinaryFromReader(message: LogoutResponse, reader: jspb.BinaryReader): LogoutResponse;
}

export namespace LogoutResponse {
    export type AsObject = {
        success: boolean,
    }
}

export class RefreshTokenRequest extends jspb.Message { 
    getRefreshToken(): string;
    setRefreshToken(value: string): RefreshTokenRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RefreshTokenRequest.AsObject;
    static toObject(includeInstance: boolean, msg: RefreshTokenRequest): RefreshTokenRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RefreshTokenRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RefreshTokenRequest;
    static deserializeBinaryFromReader(message: RefreshTokenRequest, reader: jspb.BinaryReader): RefreshTokenRequest;
}

export namespace RefreshTokenRequest {
    export type AsObject = {
        refreshToken: string,
    }
}

export class ValidateTokenRequest extends jspb.Message { 
    getToken(): string;
    setToken(value: string): ValidateTokenRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ValidateTokenRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ValidateTokenRequest): ValidateTokenRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ValidateTokenRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ValidateTokenRequest;
    static deserializeBinaryFromReader(message: ValidateTokenRequest, reader: jspb.BinaryReader): ValidateTokenRequest;
}

export namespace ValidateTokenRequest {
    export type AsObject = {
        token: string,
    }
}

export class ValidateTokenResponse extends jspb.Message { 
    getValid(): boolean;
    setValid(value: boolean): ValidateTokenResponse;
    getUserId(): string;
    setUserId(value: string): ValidateTokenResponse;

    getClaimsMap(): jspb.Map<string, string>;
    clearClaimsMap(): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ValidateTokenResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ValidateTokenResponse): ValidateTokenResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ValidateTokenResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ValidateTokenResponse;
    static deserializeBinaryFromReader(message: ValidateTokenResponse, reader: jspb.BinaryReader): ValidateTokenResponse;
}

export namespace ValidateTokenResponse {
    export type AsObject = {
        valid: boolean,
        userId: string,

        claimsMap: Array<[string, string]>,
    }
}
