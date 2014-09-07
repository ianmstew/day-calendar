# Day Calendar

Demo Backbone app that takes an array of start/end times and renders them as "events" on a day
calendar.  Start/end times are in minutes from 9:00am, and the calendar shows times ranging
from 9:00am to 9:00pm.

Implemented as a pure static page with minimal libraries, old school Javascript modules attached
to a namespaced global, and no assets build/optimization step.  For demonstration of front end
architecture for a simple Backbone application only.

TODO:
- Verify times are >= 0 and <= 720
- Unit tests
- Form fields to add/remove events and change ruler scaling
