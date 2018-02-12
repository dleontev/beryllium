defmodule Backend.Repo.Migrations.CreateAnswers do
  use Ecto.Migration

  def change do
    create table(:answers) do

      timestamps()
    end

  end
end
