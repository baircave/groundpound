class Follow < ApplicationRecord

  validates :artist_id, :user_id, presence: true
  validates :artist_id, uniqueness: { scope: :user_id }

  belongs_to :artist,
    foreign_key: :artist_id,
    class_name: 'User'

  belongs_to :user

end
