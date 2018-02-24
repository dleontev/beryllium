defmodule BackendWeb.SubmissionView do
  use BackendWeb, :view
  alias BackendWeb.SubmissionView

  def render("index.json", %{submissions: submissions}) do
    %{data: render_many(submissions, SubmissionView, "submission.json")}
  end

  def render("show.json", %{submission: submission}) do
    %{data: render_one(submission, SubmissionView, "submission.json")}
  end

  def render("submission.json", %{submission: submission}) do
    %{
      id: submission.id,
      assignment_id: submission.assignment_id,
      file_id: submission.file_id,
      text_entry: submission.text_entry
    }
  end
end
