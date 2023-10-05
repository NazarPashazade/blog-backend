import { ClassType } from 'class-transformer/ClassTransformer';
import { FindManyOptions, Repository, SelectQueryBuilder } from 'typeorm';
import { Connection, ConnectionArgs, getConnectionFromArray, getPagingParameters } from '../graphql/relay';

export class BaseRelayRepository<T> extends Repository<T> {
    async findAndPaginate<TNode>(
        condition: FindManyOptions<T>,
        args: ConnectionArgs,
        nodeCls: ClassType<TNode>,
    ): Promise<Connection<TNode>> {
        const { limit, offset } = getPagingParameters(args);
        const [entities, count] = await this.findAndCount({
            ...condition,
            skip: offset,
            take: limit,
        });

        return getConnectionFromArray(entities, nodeCls, args, count);
    }

    async getManyAndPaginate<TNode>(
        queryBuilder: SelectQueryBuilder<T>,
        args: ConnectionArgs,
        nodeCls: ClassType<TNode>,
    ): Promise<Connection<TNode>> {
        const { limit, offset } = getPagingParameters(args);
        const [entities, count] = await queryBuilder.skip(offset).take(limit).getManyAndCount();

        return getConnectionFromArray(entities, nodeCls, args, count);
    }

    async getMany<TNode>(queryBuilder: SelectQueryBuilder<T>, nodeCls: ClassType<TNode>): Promise<Connection<TNode>> {
        const [entities, count] = await queryBuilder.getManyAndCount();

        return getConnectionFromArray(entities, nodeCls, { pageSize: count }, count);
    }
}