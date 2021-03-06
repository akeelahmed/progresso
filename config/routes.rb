Progress::Application.routes.draw do
  root to: 'roots#show'

  scope '/auth' do
    get '/:provider/callback' => 'sessions#create'
    get '/failure'            => 'sessions#fail'
  end

  get '/login' => 'sessions#new', as: :login
  get '/guest_login' => 'sessions#guest', as: :guest_login
  # TODO: make this a delete request.
  get '/logout' => 'sessions#destroy', as: :logout

  namespace 'api' do
    namespace 'v1' do
      resources :boards, only: [:index, :show, :create, :update, :destroy] do
        resources :lists, only: [:index, :create]
      end

      resources :lists, only: [:show, :update, :destroy] do
        resources :cards, only: [:index, :create]
      end

      resources :cards, only: [:show, :update, :destroy]
    end
  end
end
