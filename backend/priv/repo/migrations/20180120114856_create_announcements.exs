defmodule Backend.Repo.Migrations.CreateAnnouncements do
  use Ecto.Migration

  def change do
    create table(:announcements) do

      timestamps()
    end

  end
end
