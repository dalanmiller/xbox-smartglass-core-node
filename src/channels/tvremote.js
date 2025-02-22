var Debug = require('debug')('smartglass:channel_tv_remote')
const Packer = require('../packet/packer');

module.exports = function()
{
    return {
        _channel_status: false,
        _channel_id: 0,
        _channel_request_id: -1,
        _smartglass: false,
        _xbox: false,
        _message_num: 1,

        load: function(smartglass, manager_id){
            this._channel_request_id = manager_id
            this._smartglass = smartglass
            this._smartglass.on('_on_console_status', function(message, xbox, remote, smartglass){
                if(this._channel_status == false){
                    Debug('Channel status is false, opening channel TvRemote');

                    var channel_request = Packer('message.start_channel_request')
                    channel_request.set('channel_request_id', this._channel_request_id);
                    channel_request.set('title_id', 0);
                    channel_request.set('service', Buffer.from('d451e3b360bb4c71b3dbf994b1aca3a7', 'hex'));
                    channel_request.set('activity_id', 0);
                    Debug('Send channel request on channel #'+this._channel_request_id);

                    this._smartglass._console.get_requestnum()
                    var message  = channel_request.pack(xbox)

                    Debug('Send data: '+message.toString('hex'));

                    this._smartglass.on('_on_start_channel_response', function(message, xbox, remote){
                        // console.log('Got channel response!', message)
                        this._xbox = xbox;

                        if(message.packet_decoded.protected_payload.channel_request_id == this._channel_request_id)
                        {
                            if(message.packet_decoded.protected_payload.result == 0)
                            {
                                Debug('Channel ready: TvRemote');
                                this._channel_status = true
                                this._channel_id = message.packet_decoded.protected_payload.target_channel_id

                            } else {
                                Debug('Could not open channel: TvRemote');
                            }
                        }
                    }.bind(this));

                    this._smartglass._send(message);
                }
            }.bind(this));

            this._smartglass.on('_on_json', function(message, xbox, remote, smartglass){
                var response = JSON.parse(message.packet_decoded.protected_payload.json)

                if(response.response == "Error"){
                    console.log('Got Error:', response)
                } else {
                    console.log(response)
                }

            }.bind(this))
        },

        getConfiguration: function(){
            if(this._channel_status == true){
                Debug('Get configuration');

                this._message_num++
                var msgId = '2ed6c0fd.'+this._message_num;

                var json_request = {
                    msgid: msgId,
                    request:"GetConfiguration",
                    params: null
                }

                var config_request = Packer('message.json')
                config_request.set('json', JSON.stringify(json_request));
                this._smartglass._console.get_requestnum()

                config_request.setChannel(this._channel_id)
                var config_request_packed = config_request.pack(this._smartglass._console)

                this._smartglass._send(config_request_packed);

            } else {
               Debug('Channel not ready: TtRemote')
           }
        },

        sendIrCommand: function(button_id, device_id = null){
            if(this._channel_status == true){
                Debug('Send button: '+button_id);

                this._message_num++
                var msgId = '2ed6c0fd.'+this._message_num;

                var json_request = {
                    msgid: msgId,
                    request:"SendKey",
                    params: {
                        button_id: button_id,
                        device_id: device_id
                    }
                }

                var sendkey_request = Packer('message.json')
                sendkey_request.set('json', JSON.stringify(json_request));
                this._smartglass._console.get_requestnum()

                sendkey_request.setChannel(this._channel_id)
                var sendkey_request_packed = sendkey_request.pack(this._smartglass._console)

                this._smartglass._send(sendkey_request_packed);
            } else {
                Debug('Channel not ready: TtRemote')
            }
        }
    }
}
