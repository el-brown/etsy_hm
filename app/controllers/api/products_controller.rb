class Api::ProductsController < ApplicationController

  def index
    render json: Product.w_seller
  end

end
