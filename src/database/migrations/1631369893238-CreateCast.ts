import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCast1631369893238 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'casts',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        {
          name: 'movie_id',
          type: 'uuid',
        },
        {
          name: 'character_id',
          type: 'uuid',
        },
        {
          name: 'created_at',
          type: 'timestamp with time zone',
          default: 'now()',
        },
        {
          name: 'updated_at',
          type: 'timestamp with time zone',
          default: 'now()',
        }
      ],
      foreignKeys: [
        {
          name: 'CastMovie',
          referencedTableName: 'movies',
          referencedColumnNames: ['id'],
          columnNames: ['movie_id'],
          onDelete: 'CASCADE',
        },
        {
          name: 'CastCharacter',
          referencedTableName: 'characters',
          referencedColumnNames: ['id'],
          columnNames: ['character_id'],
          onDelete: 'CASCADE',
        }
      ],
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('casts');
  }
}
