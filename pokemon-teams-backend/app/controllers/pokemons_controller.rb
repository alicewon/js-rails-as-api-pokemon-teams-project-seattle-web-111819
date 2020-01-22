require 'faker'
class PokemonsController < ApplicationController
  def index
    @pokemons = Pokemon.all
    render :json => @pokemons
  end
  def show
    @pokemon = Pokemon.find(params[:id])
    render :json => @pokemon
  end
  def new
    @pokemon = Pokemon.new
  end
  def create
    @trainer = Trainer.find(params[:trainer_id])
    if @trainer.pokemons.count >= 6
      NULL #need error handling
    else
      @pokemon = Pokemon.new(pokemon_params)
      @pokemon.nickname = Faker::Name.first_name
      @pokemon.species = Faker::Games::Pokemon.name
      @pokemon.save
      render :json => @pokemon
    end
  end
  def destroy
    @pokemon = Pokemon.find(params[:id])
    @pokemon.destroy
  end
  private
  def pokemon_params
    params.require(:pokemon).permit(:nickname, :species, :trainer_id, :pokemon => {})
  end
end