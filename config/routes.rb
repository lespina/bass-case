Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :likes, only: [:destroy]
    resources :songs, only: [:index, :create, :show]
    resources :users, only: [:index, :create, :show, :update] do
      resources :likes, only: [:create]
    end
    resource :session, only: [:create, :destroy]
  end
end
