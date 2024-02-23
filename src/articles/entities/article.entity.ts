import { Transform } from 'class-transformer';
import { Comment } from 'src/comments/entities/comment.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  slug: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  body: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.articles, { eager: true })
  author: User;

  @OneToMany(() => Comment, (comment) => comment.article)
  comments: Comment[];

  @ManyToMany(() => Tag, (tag) => tag.articles, { eager: true })
  @JoinTable()
  @Transform(({ value }) => value.map((tag) => tag.name))
  tags?: Tag[];

  @ManyToOne(() => User, (user) => user.favorites)
  favoritedBy: User[];

  @Column({ default: 0 })
  favoritesCount: number;
}
