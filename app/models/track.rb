require 'uri'

class Track < ApplicationRecord

  before_validation :ensure_track_url

  validates :track_url, :artist_id, :title, presence: true

  belongs_to :artist,
    foreign_key: :artist_id,
    class_name: 'User'

  has_many :comments,
    dependent: :destroy

  has_one_attached :artwork

  has_one_attached :track_file


  private

  def ensure_track_url
    artist_username = self.artist.username
    if !self.track_url || self.track_url == ""
      self.track_url = "#{artist_username}/#{spaces_to_dashes(self.title)}"
    else
      self.track_url = "#{artist_username}/#{spaces_to_dashes(self.track_url)}"
    end
    self.track_url = URI.encode(self.track_url)
  end

  def spaces_to_dashes(str)
    str = str.split(" ").reject { |el| el == "-" }
    str.join("-")
  end

end
