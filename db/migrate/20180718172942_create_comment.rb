class CreateComment < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.integer :author_id, null: false
      t.integer :track_id, null: false
      t.integer :parent_comment_id
      t.text :body, null: false

      t.timestamps
    end

    add_index :comments, :track_id
  end
end
