export type BuildRange<N extends number, Result extends number[] = []> = Result['length'] extends N
  ? Result[number] | N
  : BuildRange<N, [...Result, Result['length']]>;

export type Percent = BuildRange<100>;

export interface IUser {
  id: string;
  name: string;
  avatarUrl?: string;
  email?: string;
}
