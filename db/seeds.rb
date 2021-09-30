# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Seller.destroy_all
Buyer.destroy_all

categoryArr = ['Needle Point', 'Poster', 'T-Shirt', 'Throw Pillow', 'Mug']

require 'faker'

10.times do 
  s = Seller.create(name:Faker::Name.name, email:Faker::Internet.email)
  s.products.create(name:Faker::Movies::Hobbit.character, price:Faker::Commerce.price(range:30..75), description:Faker::Movies::Hobbit.quote, category:categoryArr.sample, seller_id: s.id)
  s.products.create(name:Faker::Movies::Hobbit.character, price:Faker::Commerce.price(range:30..75), description:Faker::Movies::Hobbit.quote, category:categoryArr.sample, seller_id: s.id)
  s.products.create(name:Faker::Movies::Hobbit.character, price:Faker::Commerce.price(range:30..75), description:Faker::Movies::Hobbit.quote, category:categoryArr.sample, seller_id: s.id)
  s.products.create(name:Faker::Movies::Hobbit.character, price:Faker::Commerce.price(range:30..75), description:Faker::Movies::Hobbit.quote, category:categoryArr.sample, seller_id: s.id)
  s.products.create(name:Faker::Movies::Hobbit.character, price:Faker::Commerce.price(range:30..75), description:Faker::Movies::Hobbit.quote, category:categoryArr.sample, seller_id: s.id)
  5.times do 
    b = Buyer.create(name:Faker::Name.name, max_price:Faker::Commerce.price(range:35..75), desired_categories:categoryArr.sample, seller_id:s.id)
  end
end


puts Seller.all.length 
puts Buyer.all.length 
puts Product.all.length 