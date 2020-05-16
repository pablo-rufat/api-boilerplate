import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: false, type: "varchar", length: 50 })
    email: string;

    @Column({ nullable: false, type: "varchar", length: 250 })
    password: string;

    @Column({ nullable: false, type: "varchar", length: 100 })
    name: string;
}