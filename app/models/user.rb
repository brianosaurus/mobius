class User < ApplicationRecord
  has_many :transactions, foreign_key: :from

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :rememberable,
         :trackable,
         :validatable,
         :omniauthable
  include DeviseTokenAuth::Concerns::User

  after_create :set_default_amount

  def set_default_amount
    admin = User.find_by_email('admin@brian.biz')

    transaction = admin.transactions.build({amount: 100})
    transaction.to = self
    transaction.save!
  end

  def balance
    # UTXO like but in psql
     Transaction.where(to: self.id).sum { |t| t.amount } - self.transactions.sum { |t| t.amount }
  end
end
