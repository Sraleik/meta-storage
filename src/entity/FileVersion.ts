import { Entity, PrimaryColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { FileMeta } from './FileMeta';

@Entity()
export class FileVersion extends BaseEntity {
	@PrimaryColumn({ length: 36 })
	id!: string;

	@Column({ length: 46 })
	cid!: string;

	@Column()
	date!: string;

	@Column()
	name!: string;

	@Column()
	isEncrypted!: boolean;

	@Column()
	parentFolderId!: string;

	@ManyToOne(
		type => FileMeta,
		fileMeta => fileMeta.versions,
		{ onDelete: 'CASCADE' },
	)
	@JoinColumn()
	fileMeta!: FileMeta;
}
