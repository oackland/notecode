export interface Note {
    id: number;
    title: string;
    content: string;
}

export interface Note {
    title: string;
    content: string;
}

export interface NoteWithId extends Note {
    id: number;
}
