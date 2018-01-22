defmodule Backend.Repo.Migrations.CreateDiscussions do
  use Ecto.Migration

  def change do
    create table(:discussions) do

      timestamps()
    end

  end
end
