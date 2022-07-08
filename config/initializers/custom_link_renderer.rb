#
# lib/custom_link_renderer.rb
#
class CustomLinkRenderer < WillPaginate::ActionView::LinkRenderer
    protected
    def url(page)
      page = super.gsub(".js", "")
    end
  end