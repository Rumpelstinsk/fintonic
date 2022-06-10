export interface BaseRepository<DomainEntity, CreateParams> {
  create: (createParams: CreateParams) => Promise<DomainEntity>;
  delete: (id: string) => Promise<DomainEntity | null>;
}
