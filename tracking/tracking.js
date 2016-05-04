'use strict'
angular.module("customerTrackingApp").factory('tracking', function ($q, $resource,signalr, api, serverInfo) {

    var store = {
        maxSessionId: 0
    };
    return {
        get: function (key) {
            return store[key];
        },
        set: function (key, val) {
            store[key] = val;
        },
        getLatestEvent: function (trackingSession) {
            var event = null;
            for (var e in trackingSession.Events) {
                if (event == null) {
                    event = trackingSession.Events[e];
                }
                else {
                    if (trackingSession.Events[e].Id > event.Id) {
                        event = trackingSession.Events[e];
                    }
                }
            }
            return event;
        },
        getParameter: function (event,key) {
            for (var e in event.Parameters) {
                if (event.Parameters[e].Key == key) {
                    return event.Parameters[e];
                }
            }
            return null;
        },
        getParameterFromLatestEvent: function (session,key) {
            var p = this.getLatestEvent(session);
            p = this.getParameter(p, key);
            return p;
        },
        getCurrentSession: function () {
            return store.currentSession;
        },
        setCurrentSession: function (s) {
            store.currentSession = s;
        },
        getSession: function (id) {
            return api.get({ type: 'TrackingSession', data: { id: id, userId: serverInfo.userId }});
        },
    
        getData: function (args) {
            var deferred = $q.defer();
            if (!store.sessions) {
                api.get({ resource: args.page, method: args.method, data: args.data }).then(
                   function (data) {
                       store.sessions = data;
                       deferred.resolve(data);
                   },
                   function (statusCode) {

                   });
            }
            else{
                deferred.resolve(store.sessions);
            }
            return deferred.promise;
        },
        getSessions: function (args) {
            var sessions = api.query({ type: 'TrackingSessionCollection', data: { method: 'getall', userId: serverInfo.userId } });
            sessions.$promise.then(function () {
                var l = sessions.length;
                while (l--) {
                    if (sessions[l].Id > store.maxSessionId)
                        {store.maxSessionId = sessions[l].Id;}
                }
            });
            return sessions;
        },
        getStats: function (args) {
            var sessions = api.get({ type: 'Object', data: { method: 'getstats', userId: serverInfo.userId } });
            return sessions;
        },
        getReport: function (args) {
            return api.get({ type: 'TrackingReport', data: { method: 'getreport', start: (!args) ? null : args.start, end: (!args) ? null : args.end } });
        },
        getReportDay: function (args) {
            return api.get({ type: 'TrackingReport', data: { method: 'day', day: args } });
        },
        setSessions: function (s) {
            store.sessions = s;
        },
        newSession: function (f) {
            var t = signalr.getHub('trackingSessionHub');
            t.client.newSession = f;
        },
        registerDashboard: function (args) {
            //var t = signalr.getHub('trackingSessionHub');
            //t.server.registerDashboard();
  
        },
        syncSession:function(session,event){
         
            if (!store.sessions) {
                store.sessions = [];
            }
            var l = store.sessions.length;
            while (l--) {
                if (store.sessions[l].Id == session.Id) {
                    store.sessions[l].Events.push(event);
                    return;
                }
            }
            store.sessions.push(session);
        }
    }
});