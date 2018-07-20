class User < ApplicationRecord

  after_initialize :ensure_session_token, :default_nickname

  validates :username, :session_token, :password_digest, :nickname, presence: true
  validates :username, presence: true, uniqueness: true
  validates :password, length: { minimum: 8 }, allow_nil: true

  attr_reader :password

  has_one_attached :profile_photo
  
  has_one_attached :cover_photo

  has_many :tracks,
    foreign_key: :artist_id,
    dependent: :destroy

  has_many :comments,
    dependent: :destroy


  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return user if user && user.is_password?(password)
    nil
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save
    self.session_token
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end


  private

  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end

  def default_nickname
    self.nickname ||= self.username
  end

end
