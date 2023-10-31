import { sample } from "rxjs"
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column('simple-array',{nullable: true})
    phone: string[]

    @Column()
    password: string

    @Column('bool',{nullable: true,default: false})
    isAdmin: boolean

    @Column("bool",{nullable: true,default: false})
    isVarified: boolean
}