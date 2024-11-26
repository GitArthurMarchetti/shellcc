// src/types/room.ts
export interface Room {
     id: number;
     title: string;
     description: string;
     color_theme: string;
     ownerId: number;
     max_members: number;
     member_count: number;
     role: 'owner' | 'admin' | 'member';
     status: 'pending' | 'active' | 'inactive';
     createdAt: string;
}

export interface RoomMember {
     id: number;
     name: string;
     email: string;
     role: 'owner' | 'admin' | 'member';
     status: 'pending' | 'active' | 'inactive';
}

export interface RoomDetails extends Room {
     members: RoomMember[];
}

export interface CreateRoomData {
     title: string;
     description?: string;
     colorTheme: string;
     maxMembers?: number;
}