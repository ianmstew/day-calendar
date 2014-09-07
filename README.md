# Day Calendar

Demo Backbone app that takes an array of start/end times and renders them as "events" on a day
calendar.  Start/end times are in minutes from 9:00am, and the calendar shows times ranging
from 9:00am to 9:00pm.  Events are guaranteed not to overlap visually, and events with conflicting
time ranges have equal widths.

Implemented as a pure static page with minimal libraries, old school Javascript modules attached
to a namespaced global, and no assets build/optimization step.  The goal is to demonstrate scalable
front end architecture and a custom "best fit" algorthm using a simple Backbone widget.

TODO:
- Verify times are >= 0 and <= 720
- Unit tests
- Form fields to add/remove events and change ruler scaling
