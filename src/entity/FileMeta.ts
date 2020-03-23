import { Entity, PrimaryColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { FileVersion } from './FileVersion';

@Entity()
export class FileMeta extends BaseEntity {
	@PrimaryColumn({ length: 36 })
	id!: string;

	@Column()
	type!: string;

	@OneToMany(
		type => FileVersion,
		fileVersion => fileVersion.fileMeta,
		{ cascade: true },
	)
	versions?: FileVersion[];
}
