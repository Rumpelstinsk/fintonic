export interface BaseRepository<DomainEntity, CreateParams> {
  create: (createParams: CreateParams) => Promise<DomainEntity>;
}
