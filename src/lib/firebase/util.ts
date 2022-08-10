export type docType<R> = R extends any ? { id: string } & R : never
