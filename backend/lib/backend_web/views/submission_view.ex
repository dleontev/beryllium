defmodule BackendWeb.SubmissionView do
  use BackendWeb, :view
  alias BackendWeb.SubmissionView

  def render("index.json", %{submissions: submissions}) do
    %{data: render_many(submissions, SubmissionView, "submission.json")}
  end

  def render("show.json", %{submission: submission}) do
    %{data: render_one(submission, SubmissionView, "submission.json")}
  end

  def render("show_count.json", %{submission: submission}) do
    IO.puts("-----------------------------------------")
    IO.inspect(submission)
    IO.puts("-----------------------------------------")
    %{data: render_one(submission, SubmissionView, "submission_count.json")}
  end

  def render("submission.json", %{submission: submission}) do
    %{
      id: submission.id,
      assignment_id: submission.assignment_id,
      file_id: submission.file_id,
      text_entry: submission.text_entry
    }
  end

  def render("submission_count.json", %{submission: count}) do
    [head | _] = count
    %{
      count: head.submission_count
    }
  end
end
