class Product < ApplicationRecord
  belongs_to :seller

  def self.w_seller
    select('p.id, p.name, p.description, p.price, p.category, s.name AS sellers_name, s.email')
    .from('products AS p')
    .joins('LEFT JOIN sellers AS s ON p.seller_id = s.id')
    .order('sellers_name ASC')
  end 
end
