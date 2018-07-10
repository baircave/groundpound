class CreateUser < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :password_digest, null: false
      t.string :location
      t.string :nickname, null: false
      t.string :profile_url
      t.text :bio
      t.string :session_token, null: false


      t.timestamps
    end

    add_index :users, :username, unique: true
    add_index :users, :profile_url, unique: true
    add_index :users, :session_token, unique: true
  end
end
