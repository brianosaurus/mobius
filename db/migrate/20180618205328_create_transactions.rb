class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.integer :from_id
      t.integer :to_id

      t.float :amount, default: 100

      t.timestamps
    end
  end
end
