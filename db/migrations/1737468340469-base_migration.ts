import { MigrationInterface, QueryRunner } from "typeorm";

export class BaseMigration1737468340469 implements MigrationInterface {
    name = 'BaseMigration1737468340469'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "client" ("cpf" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "address" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_9921dca81551c93e5a459ef03ce" PRIMARY KEY ("cpf"))`);
        await queryRunner.query(`CREATE TYPE "public"."vehicle_status_enum" AS ENUM('AVAILABLE', 'UNDER_MAINTANCE', 'WAITING_MAINTENANCE', 'OUT_OF_SERVICE')`);
        await queryRunner.query(`CREATE TABLE "vehicle" ("licensePlate" character varying NOT NULL, "model" character varying NOT NULL, "brand" character varying NOT NULL, "fabricationDate" date, "modelYear" integer NOT NULL, "color" character varying NOT NULL, "renavam" character varying, "fuelType" character varying, "chassiNumber" character varying, "currentMileage" integer NOT NULL, "descritpion" text, "status" "public"."vehicle_status_enum" NOT NULL DEFAULT 'AVAILABLE', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "clientCpf" character varying NOT NULL, CONSTRAINT "PK_a654a0355ae4c5ba31c5f6c8925" PRIMARY KEY ("licensePlate"))`);
        await queryRunner.query(`CREATE TABLE "user_role_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_43019865301516c7997e39dfff2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "role" integer NOT NULL DEFAULT '2', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "vehicle" ADD CONSTRAINT "FK_9f583fa2c23591a28c75b6fb763" FOREIGN KEY ("clientCpf") REFERENCES "client"("cpf") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicle" DROP CONSTRAINT "FK_9f583fa2c23591a28c75b6fb763"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "user_role_entity"`);
        await queryRunner.query(`DROP TABLE "vehicle"`);
        await queryRunner.query(`DROP TYPE "public"."vehicle_status_enum"`);
        await queryRunner.query(`DROP TABLE "client"`);
    }

}
