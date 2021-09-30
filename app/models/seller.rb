class Seller < ApplicationRecord
  has_many :products, dependent: :destroy
  has_many :buyers, dependent: :destroy
end
