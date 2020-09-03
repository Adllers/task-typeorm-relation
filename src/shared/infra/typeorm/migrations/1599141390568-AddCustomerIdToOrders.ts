import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

// creating the customer_id column in table orders. this column works like foreign key on orders table to reference customers table

export default class AddCustomerIdToOrders1599141390568 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

      await queryRunner.addColumn(
        'orders',
        new TableColumn({
          name: 'customer_id',
          type: 'uuid',
          isNullable: true
        }),
      );

      await queryRunner.createForeignKey(
        'orders',
        new TableForeignKey({
          name: 'OrdersCustomer',
          columnNames: ['customer_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'customers',
          onDelete: `SET NULL`,
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

      await queryRunner.dropForeignKey('orders', 'OrdersCustomer');

      await queryRunner.dropColumn('orders', 'customer_id');

    }

}
