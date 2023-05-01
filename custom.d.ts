export {}

declare global {
    interface Role {
        role?: string;
    }

    /**
     * If you want to provide custom types for the user.publicMetadata object,
     * simply redeclare this rule in the global namespace.
     * Every user object will use the provided type.
     */
    interface UserPublicMetadata {
        role: string;
    }
}